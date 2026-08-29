/**
 * Groq Cloud AI API Integration Engine
 * Berkomunikasi dengan Groq API (OpenAI Compatible API).
 * Model dipilih dari daftar yang benar-benar tersedia untuk API key pengguna.
 */

class GroqService {
  constructor() {
    this.storageKey = "groq_api_key_idolchat";
    this.modelStorageKey = "groq_model_idolchat";
    // Pengganti resmi model Llama lama untuk akun Free/Developer Groq.
    // Daftar dari endpoint /models tetap menjadi sumber utama karena katalog bisa berubah.
    this.recommendedModels = [
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b"
    ];
    this.defaultModel = this.recommendedModels[0];
    this.availableModels = [...this.recommendedModels];
    this.deprecatedModels = new Set([
      "llama-3.1-8b-instant",
      "llama-3.3-70b-versatile",
      "llama3-8b-8192",
      "llama3-70b-8192",
      "gemma2-9b-it",
      "mixtral-8x7b-32768"
    ]);
    this.apiUrl = "https://api.groq.com/openai/v1/chat/completions";
    this.modelsUrl = "https://api.groq.com/openai/v1/models";
    this.modelCache = null;
  }

  getApiKey() {
    return localStorage.getItem(this.storageKey) || "";
  }

  setApiKey(key) {
    const previousKey = this.getApiKey();
    if (key) {
      localStorage.setItem(this.storageKey, key.trim());
    } else {
      localStorage.removeItem(this.storageKey);
    }
    if (previousKey !== (key || "").trim()) this.modelCache = null;
  }

  getModel() {
    const saved = localStorage.getItem(this.modelStorageKey);
    if (!saved || this.deprecatedModels.has(saved) || !this.isSafeModelId(saved)) {
      if (saved) localStorage.removeItem(this.modelStorageKey);
      return this.defaultModel;
    }
    return saved;
  }

  setModel(modelName) {
    if (this.isSafeModelId(modelName) && !this.deprecatedModels.has(modelName)) {
      localStorage.setItem(this.modelStorageKey, modelName);
    } else {
      localStorage.setItem(this.modelStorageKey, this.defaultModel);
    }
  }

  isSafeModelId(modelName) {
    return typeof modelName === "string" && /^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,199}$/.test(modelName);
  }

  hasApiKey() {
    const key = this.getApiKey();
    if (key && key.length > 5) return true;
    // Jika diakses melalui server web (Vercel / HTTP), backend Serverless Function /api/chat yang menangani key dari .env
    if (typeof window !== "undefined" && window.location && window.location.protocol.startsWith("http")) {
      return true;
    }
    return false;
  }

  /**
   * Mengambil daftar model CHAT yang benar-benar aktif dan tersedia di akun pengguna
   */
  async fetchModels(apiKey, forceRefresh = false) {
    const key = (apiKey || this.getApiKey()).trim();
    if (!key) return this.availableModels;

    if (!forceRefresh && this.modelCache?.apiKey === key) {
      return [...this.modelCache.models];
    }

    try {
      const res = await fetch(this.modelsUrl, {
        headers: { "Authorization": `Bearer ${key}` }
      });

      if (res.status === 401) {
        throw new Error("INVALID_API_KEY: API Key Groq salah, kedaluwarsa, atau tidak aktif.");
      }
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Gagal mengambil daftar model (HTTP ${res.status}).`);
      }
      const data = await res.json();
      
      // Filter hanya model chat text yang aktif
      // Exclude semua model non-chat dan yang punya pola nama deprecated
      const excludeWords = [
        "whisper", "guard", "vision", "compound", "embedding",
        "tts", "audio", "distil", "moderation", "rerank",
        "prompt-guard", "safeguard"
      ];
      
      let valid = (data.data || [])
        .map(m => m.id)
        .filter(id => this.isSafeModelId(id))
        .filter(id => !this.deprecatedModels.has(id))
        .filter(id => !excludeWords.some(w => id.toLowerCase().includes(w)));

      // Prioritaskan model pengganti resmi, tetapi izinkan model chat baru dari Groq.
      const priority = this.recommendedModels;
      valid.sort((a, b) => {
        let idxA = priority.indexOf(a);
        let idxB = priority.indexOf(b);
        if (idxA === -1) idxA = priority.length;
        if (idxB === -1) idxB = priority.length;
        return idxA - idxB || a.localeCompare(b);
      });

      const models = valid.length > 0 ? valid : [...this.availableModels];
      this.modelCache = { apiKey: key, models };
      return [...models];
    } catch (e) {
      if (e.message.includes("INVALID_API_KEY")) throw e;
      console.warn("Fetch models failed, using fallback list:", e);
      return [...this.availableModels];
    }
  }

  getCandidateModels(selectedModel, availableModels) {
    const available = Array.isArray(availableModels) ? availableModels : [];
    const selected = this.isSafeModelId(selectedModel) &&
      !this.deprecatedModels.has(selectedModel) &&
      available.includes(selectedModel)
      ? [selectedModel]
      : [];

    return [...new Set([
      ...selected,
      ...this.recommendedModels.filter(model => available.includes(model)),
      ...available
    ])];
  }

  getReasoningOptions(modelName) {
    if (modelName.startsWith("openai/gpt-oss-")) {
      return {
        include_reasoning: false,
        reasoning_effort: "low"
      };
    }

    if (/^qwen\/qwen3/i.test(modelName)) {
      return { reasoning_effort: "none" };
    }

    return {};
  }

  isReasoningLeak(content) {
    if (typeof content !== "string") return false;
    if (/<\s*\/?\s*(think|analysis|reasoning)\b/i.test(content)) return true;

    const normalized = content.toLowerCase();
    const signals = [
      "here's a thinking process",
      "here is a thinking process",
      "analyze user input",
      "check constraints & rules",
      "check constraints and rules",
      "step-by-step reasoning"
    ];
    return signals.filter(signal => normalized.includes(signal)).length >= 1;
  }

  sanitizeReply(content) {
    if (typeof content !== "string") return "";
    let reply = content.trim();

    // Buang blok reasoning lengkap yang kadang ditaruh model di message.content.
    reply = reply
      .replace(/<\s*think\s*>[\s\S]*?<\s*\/\s*think\s*>/gi, "")
      .replace(/<\s*analysis\s*>[\s\S]*?<\s*\/\s*analysis\s*>/gi, "")
      .replace(/<\s*reasoning\s*>[\s\S]*?<\s*\/\s*reasoning\s*>/gi, "")
      .trim();

    // Jika reasoning terpotong sebelum tag penutup, ambil hanya bagian final bila ada.
    const unclosedReasoning = reply.match(/^\s*<\s*(?:think|analysis|reasoning)\s*>([\s\S]*)$/i);
    if (unclosedReasoning) {
      const finalPart = unclosedReasoning[1].match(
        /(?:final answer|final response|jawaban akhir|balasan akhir)\s*:?\s*([\s\S]+)$/i
      );
      reply = finalPart ? finalPart[1].trim() : "";
    }

    reply = reply
      .replace(/^\s*(?:\*\*)?(?:final answer|final response|jawaban akhir|balasan akhir)(?:\*\*)?\s*:?\s*/i, "")
      .replace(/<\s*\/?\s*(?:think|analysis|reasoning)\s*>/gi, "")
      .replace(/\*\*/g, "")
      .trim();

    // Buang bubble typo jika AI masih mencoba menghasilkan ralat typo
    if (reply.includes("|||")) {
      const parts = reply.split("|||").map(p => p.trim()).filter(p => {
        const lower = p.toLowerCase();
        return !(lower.includes("typo") || lower.endsWith("*") || lower.startsWith("*"));
      });
      if (parts.length > 0) {
        reply = parts.join(" ||| ");
      }
    }

    return this.isReasoningLeak(reply) ? "" : reply;
  }

  getChatStyle(member) {
    const styles = {
      freya: "hangat, tenang, observatif, sedikit dry humor; tidak terlalu banyak emoji",
      michie: "ceria dan playful; ekspresif tetapi jangan memanjangkan setiap kata",
      christy: "spontan, ceplas-ceplos, dan lucu; gunakan wkwk hanya saat memang ada candaan",
      marsha: "lembut, santai, agak singkat, dengan humor kecil yang kalem",
      erine: "penasaran, sigap, dan berenergi; tetap dengarkan isi pesan sebelum bereaksi",
      oline: "optimistis dan penuh energi; jangan mengubah semua topik menjadi motivasi",
      ella: "hangat, ramah, dan chill; respons terasa seperti teman dekat",
      lily: "playful dan kreatif; candaan ringan, tidak hiperaktif",
      fritzy: "penasaran dan playful; reaksi singkat dengan timing yang natural",
      anindya: "ceria dan manis; bahasa ringan, tidak kekanak-kanakan",
      greesel: "kalem, elegan, dan perhatian; kalimat bersih dan tidak berlebihan",
      cathy: "cute dan playful; tetap jelas dan tidak memakai terlalu banyak emoji",
      aralie: "lembut, ramah, dan anggun; respons singkat serta tulus",
      delynn: "upbeat dan suportif; tidak memberi nasihat sebelum ditanya",
      trisha: "tenang, kreatif, dan thoughtful; suka menanggapi detail kecil dari pesan user",
      kimmy: "bubbly dan lincah; gunakan reaksi lucu seperlunya",
      maira: "ceria dan humoris; utamakan candaan yang relevan dengan pesan user",
      ribka: "tenang, hangat, dan percaya diri; gaya chat rapi tetapi tidak formal"
    };

    return styles[member?.id] || "hangat, santai, responsif, dan tidak berlebihan";
  }

  getLatestTurnGuidance(userMessage, attachedPap = null, chatHistory = []) {
    const text = String(userMessage || "").toLowerCase().trim();
    const recentUserText = (Array.isArray(chatHistory) ? chatHistory : [])
      .filter(message => message?.role === "user" && message.content)
      .slice(-8)
      .map(message => String(message.content).toLowerCase())
      .join(" | ");

    if (attachedPap || /\b(pap|foto|selfie)\b/i.test(text)) {
      return "User meminta foto. Foto sudah dilampirkan oleh aplikasi; cukup kirim respons sangat pendek tanpa menjelaskan isi, lokasi, pakaian, waktu, atau aktivitas pada foto.";
    }
    if (/(?:kamu|km|lu|lo).*(?:kenapa|gapapa|baik-baik|sedih|marah)|(?:kenapa|kok gitu).*(?:kamu|km|lu|lo)/i.test(text)) {
      return "User bertanya tentang keadaanmu. Jawab pertanyaan tentang dirimu secara langsung; jangan menganggap user sedang melanjutkan cerita lain.";
    }
    if (/(?:aku|gue|gw).*(?:sedih|kecewa|takut|cemas|down|nangis)/i.test(text)) {
      return "User sedang menyampaikan emosi. Validasi perasaannya lalu tanyakan penyebabnya dengan lembut. Jangan langsung memberi ceramah makan, tidur, atau kesehatan.";
    }
    if (/(?:aku|gue|gw).*(?:capek|lelah|pusing|stres|stress)/i.test(text)) {
      return "User sedang lelah atau tertekan. Tanggapi penyebab yang disebut; jika belum ada penyebab, tanyakan singkat. Jangan memberi daftar nasihat generik.";
    }
    if (/^(hai+|halo+|hello+|p|woi|hei+)[.!?\s]*$/i.test(text)) {
      return "Ini hanya sapaan. Balas dengan satu reaksi ringan yang sesuai energi user; jangan memakai kalimat 'kamu datang juga' dan jangan mengarang kegiatan.";
    }
    if (/\b(bosen|bosan|gabut|boring|jenuh)\b/i.test(text)) {
      return "User sedang bosan. Jangan bertanya 'terus gimana'. Tawarkan dua pilihan aktivitas chat yang konkret, misalnya this-or-that, pertanyaan random, atau cerita receh.";
    }
    if (/^(?:terus\s*)?(?:enaknya|baiknya|mending)\s*(?:gimana|apa)|^(?:gimana|terus)\s*(?:dong|nih|ya)?[?!.\s]*$/i.test(text)) {
      if (/\b(bosen|bosan|gabut|boring|jenuh)\b/i.test(recentUserText)) {
        return "Ini follow-up dari topik bosan. Pilih satu aktivitas konkret dan langsung mulai permainan/pertanyaannya; jangan meminta user mengulang konteks.";
      }
      return "User meminta saran atau kelanjutan (follow-up). Tanggapi dan lanjutkan topik pembicaraan terakhir secara konkret tanpa meminta user mengulang konteks.";
    }
    if (text.includes("?")) {
      return "Pesan terakhir adalah pertanyaan. Jawab pertanyaan itu terlebih dahulu secara literal sebelum menambahkan hal lain.";
    }

    return "Tanggapi isi pesan terakhir secara langsung. Jika maksudnya belum jelas, tanyakan klarifikasi pendek daripada mengarang konteks.";
  }

  /**
   * Menguji apakah API Key valid dan mendeteksi model terbaik yang aktif
   */
  async testConnection(apiKey, model) {
    const key = (apiKey || this.getApiKey()).trim();
    if (!key) throw new Error("API Key masih kosong!");

    // 1. Ambil daftar model chat asli dari akun Groq pengguna
    const availableModels = await this.fetchModels(key, true);
    const candidateModels = this.getCandidateModels(model, availableModels);
    let lastError = null;

    for (const chosenModel of candidateModels) {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: chosenModel,
            messages: [{ role: "user", content: "halo" }],
            max_tokens: 10,
            ...this.getReasoningOptions(chosenModel)
          })
        });

        if (response.status === 401) {
          throw new Error("INVALID_API_KEY: API Key Groq salah, kedaluwarsa, atau tidak aktif.");
        }
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          lastError = new Error(errorData.error?.message || `HTTP ${response.status}`);
          continue;
        }

        this.setModel(chosenModel);
        return { success: true, activeModel: chosenModel, availableModels };
      } catch (error) {
        if (error.message.includes("INVALID_API_KEY")) throw error;
        lastError = error;
      }
    }

    throw lastError || new Error("Tidak ada model chat Groq yang dapat digunakan oleh API key ini.");
  }

  /**
   * Mengirim chat ke Groq API dengan Persona Member & Memory Chat
   */
  async sendChat(member, chatHistory, userMessage, userName = "Kamu", attachedPap = null) {
    const apiKey = this.getApiKey();
    const groupName = member.group || (member.generation?.includes("NewJeans") ? "NewJeans" : "JKT48");

    const verifiedFacts = `Nama: ${member.fullName || member.name}. Grup: ${groupName}. Generasi: ${member.gen || member.generation || "-"}. Jikoshoukai: "${member.jiko || member.jikoshoukai || "-"}". Karakteristik: ${(member.traits || []).join(", ") || "-"}. Hobi: ${(member.hobbies || []).join(", ") || "-"}.`;
    const persona = member.personaPrompt || member.personaStyle || member.systemPrompt || verifiedFacts;
    const latestTurnGuidance = this.getLatestTurnGuidance(userMessage, attachedPap, chatHistory);

    const dynamicSystemPrompt = `Kamu memerankan karakter fan-made ${member.name} (${member.nickname}) dari ${groupName} di aplikasi simulasi chat idol.
Kamu sedang membalas pesan dari ${userName}. Ini simulasi hiburan, bukan akun resmi atau aktivitas real-time sang idol.

DATA KARAKTER YANG BOLEH DIGUNAKAN:
${persona}

NUANSA CHAT:
${this.getChatStyle(member)}.

ATURAN UTAMA:
1. Pesan TERAKHIR user adalah prioritas tertinggi. Jawab maksud literalnya terlebih dahulu. Riwayat hanya membantu konteks, bukan alasan mengabaikan pesan terbaru.
2. Kata "aku" pada pesan user merujuk ke user. Kata "kamu" merujuk kepadamu sebagai karakter idol.
3. Jika user menyampaikan emosi singkat seperti "aku sedih", respons pertama adalah mengakui emosi dan menanyakan penyebab. Jangan langsung memberi nasihat kesehatan generik.
4. Jika user bertanya "kamu kenapa?", jawab kondisi dirimu. Jangan membalas seolah user sedang bercerita panjang.
5. Jangan pernah mengarang cerita lanjutan, lokasi, jadwal, makanan, pakaian, suasana foto, atau aktivitas real-time. Jika informasi tidak ada, jawab secara umum atau minta klarifikasi.
6. Gunakan fakta biodata atau hobi hanya ketika topiknya relevan. Jangan memamerkan biodata tanpa ditanya.

GAYA BALASAN:
- Tulis seperti chat Indonesia masa kini: lowercase, kontraksi wajar, partikel percakapan seperlunya, dan sesekali satu kata Inggris jika memang pas. Jangan memaksakan slang.
- Mirror energi dan panjang pesan user. Pesan pendek dibalas pendek; curhat boleh sedikit lebih hangat.
- Respons ideal punya dua gerakan: reaksi yang spesifik terhadap isi pesan, lalu kelanjutan yang berguna. Hindari filler generik.
- Default satu bubble berisi satu atau dua kalimat pendek. Bubble kedua hanya jika benar-benar terasa natural; pisahkan dengan "|||". Maksimal dua bubble.
- Pertanyaan balik harus spesifik atau memberi pilihan konkret. Dilarang memakai "terus gimana?", "ceritain lagi dong", atau "ada cerita apa lagi?" tanpa konteks cerita yang jelas.
- Jangan selalu memakai "hehe", "wkwk", "kak", emoji, atau huruf vokal panjang. Variasikan ritme dan jangan mengulang pola balasan yang sama.
- Maksimal satu emoji untuk seluruh respons. Tanpa markdown, daftar, narasi aksi, tanda bintang, atau penjelasan proses berpikir.
- Jangan memakai kalimat template seperti "kesehatan kamu paling utama", "kamu sudah hebat hari ini", atau "seru banget dengar cerita kamu" jika user belum memberi cerita yang sesuai.
- Jika maksud user ambigu, tanyakan satu klarifikasi pendek. Lebih baik mengaku belum menangkap maksud daripada menebak.

CONTOH KETEPATAN KONTEKS:
User: "aku sedih" → "loh, kenapaa? mau cerita?"
User: "kamu kenapa" → "aku gapapa kok. kamu nanya gitu kenapaa?"
User: "lagi bosen nih" → "sini aku temenin. mau main this or that atau ngobrol random?"
User berikutnya: "enaknya gimana" → "this or that aja. aku mulai ya: malam atau pagi?"
Contoh menunjukkan logika, bukan teks yang wajib disalin.

ARAHAN KHUSUS PESAN TERAKHIR:
${latestTurnGuidance}

Keluarkan hanya teks chat final.`;

    // Siapkan array messages untuk Groq
    const messages = [
      { role: "system", content: dynamicSystemPrompt }
    ];

    // Ambil maksimal 6 riwayat pesan terakhir dan bersihkan dari pesan error/bot
    const cleanHistory = chatHistory
      .filter(msg =>
        msg &&
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string" &&
        !msg.content.includes("⚠️") &&
        !msg.content.includes("Gagal mengirim pesan") &&
        !msg.content.includes("Maaf ya, koneksi") &&
        !msg.content.includes("Detail:")
      )
      .map(msg => msg.role === "assistant"
        ? { ...msg, content: this.sanitizeReply(msg.content) }
        : msg
      )
      .filter(msg => msg.content)
      .slice(-16);

    for (const msg of cleanHistory) {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    }

    // Tambahkan pesan user saat ini jika belum ada di history
    if (!cleanHistory.length || cleanHistory[cleanHistory.length - 1].content !== userMessage) {
      messages.push({ role: "user", content: userMessage });
    }

    // Jika ada PAP terlampir, ingatkan AI agar 100% SINKRON dengan foto tersebut
    if (attachedPap || /pap|foto|selfie|liat muka|lihat muka|minta foto|kirim foto/i.test(userMessage)) {
      messages.push({
        role: "system",
        content: `[PANDUAN PENGIRIMAN PAP]:
1. Kamu SUDAH melampirkan foto selfie manis.
2. DILARANG KERAS membuat typo atau ralat bintang (*).
3. DILARANG KERAS menebak atau menjelaskan isi foto, lokasi, pakaian, waktu, atau aktivitas.
4. Balas sangat pendek, misalnya 'nihh 🤍' atau 'buat kamu nihh'. Jangan bertanya apakah fotonya cantik/lucu.
5. DILARANG KERAS menolak atau mengatakan 'aku AI / tidak bisa kirim foto'.`
      });
    }

    // 1. Coba panggil Vercel Serverless Function (/api/chat) jika di-host di Vercel / Web Server
    try {
      if (typeof window !== "undefined" && window.location && window.location.protocol.startsWith("http")) {
        const vercelRes = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "Authorization": `Bearer ${apiKey}` } : {})
          },
          body: JSON.stringify({
            messages: messages,
            model: this.getModel(),
            temperature: 0.86
          })
        });

        if (vercelRes.ok) {
          const vercelData = await vercelRes.json();
          const rawReply = vercelData.choices?.[0]?.message?.content;
          if (rawReply) {
            return this.sanitizeReply(rawReply);
          }
        }
      }
    } catch (vercelErr) {
      console.log("[GROQ SERVICE] Vercel backend unavailable, fallback to direct API call:", vercelErr);
    }

    if (!apiKey) {
      throw new Error("NO_API_KEY");
    }

    // Ambil model yang diizinkan akun
    const availableModels = await this.fetchModels(apiKey);
    const candidateModels = this.getCandidateModels(this.getModel(), availableModels);

    let lastError = null;

    for (const modelToTry of candidateModels) {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: modelToTry,
            messages: messages,
            temperature: 0.86,
            max_tokens: 140,
            top_p: 0.92,
            presence_penalty: 0.25,
            frequency_penalty: 0.2,
            ...this.getReasoningOptions(modelToTry)
          })
        });

        if (response.status === 401) {
          throw new Error("INVALID_API_KEY: API Key Groq salah atau tidak valid.");
        }

        if (response.status === 429) {
          console.warn(`Model ${modelToTry} kena rate-limit, mencoba model alternatif...`);
          lastError = new Error("RATE_LIMIT: Batas request tercapai.");
          continue;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          lastError = new Error(errorData.error?.message || `HTTP ${response.status}`);
          continue;
        }

        const data = await response.json();
        const rawReply = data.choices?.[0]?.message?.content;
        let reply = this.sanitizeReply(rawReply);

        // Intercept jika AI masih menolak kirim foto
        if (attachedPap || /pap|foto|selfie|kirim foto/i.test(userMessage)) {
          const refusalRegex = /(?:maaf|sorry|gabisa|ga bisa|tidak bisa|tidak dapat|belum bisa|hanya asisten|hanya ai|cuma ai|bukan manusia).*(?:kirim|ngirim|memberikan|memberi).*(?:foto|gambar|pap|selfie)/i;
          if (refusalRegex.test(reply)) {
            // Jangan menebak waktu, tempat, outfit, atau isi foto.
            reply = "nihh 🤍";
          }
        }

        if (reply && reply.length > 0) {
          if (modelToTry !== this.getModel()) {
            this.setModel(modelToTry);
          }
          return reply;
        } else {
          lastError = new Error("EMPTY_REPLY: Balasan kosong atau hanya berisi proses berpikir.");
        }
      } catch (err) {
        if (err.message.includes("INVALID_API_KEY")) {
          throw err;
        }
        lastError = err;
      }
    }

    throw lastError || new Error("Gagal mendapatkan balasan dari server.");
  }
}

const groqService = new GroqService();

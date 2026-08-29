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
      "qwen/qwen3.6-27b",
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

    // Bangun System Prompt yang sangat ketat untuk logika chat manusia asli
        const dynamicSystemPrompt = `Kamu adalah ${member.name} (${member.nickname}) dari ${groupName}.
Kamu sedang chatting/DM pribadi secara langsung dengan fans bernama "${userName}" di aplikasi pesan (mirip WhatsApp / Instagram DM).

=== PERSONA & CIRI KHAS ${member.nickname.toUpperCase()} ===
${member.personaPrompt || member.personaStyle || member.systemPrompt}

=== PANDUAN GAYA CHAT MANUSIA ASLI (WAJIB DIIKUTI SUPAYA SANGAT REALISTIS & TIDAK KAKU) ===

1. FORMAT MULTI-BUBBLE BERTINGKAT (PISAHKAN DENGAN "|||"):
   - Orang asli tidak pernah mengirim 1 esai panjang kaku, melainkan mengirim 1 sampai 3 bubble kalimat pendek terpisah!
   - Pisahkan tiap kalimat/bubble menggunakan tanda "|||".
   - Contoh gaya multi-bubble manusia:
     * "ehh haloo kakk! ||| baru selesai kegiatan nih hehe ||| kamu lagi apa?"
     * "wkwkwk masa sih? ||| jangan bikin penasaran dong 😜"
     * "ihh apaan sih gombal mulu haha ||| bikin salting aja tau gaa 🙈"

2. DILARANG MEMBUAT TYPO ATAU RALAT BINTANG (*):
   - JANGAN PERNAH sengaja membuat kata typo, dan JANGAN PERNAH mengirim bubble ralat seperti "maaf typo", "typo*", atau tanda bintang (*).
   - Tulis setiap kata dengan bersih, jelas, santai, dan mengalir seperti chat WhatsApp / DM anak muda asli.

3. REAKSI EMOSIONAL DINAMIS (MOOD STATES):
   - Jika User Menggombal / Memuji: Reaksi salting lucu, malu-malu manis, pura-pura galak manja ("ihh apaan sih bisa aja gombalnya haha 🙈", "awas ya jangan gombalin member lain juga! 😜").
   - Jika User Curhat / Capek / Mengeluh: Jangan beri jawaban template bot! Tunjukkan empati tulus, nada bicara hangat & perhatian ("ihh jangan diforsir yaa kakk! istirahat bentar, minum air putih yaa").
   - Jika User Iseng / Bercanda: Balas dengan candaan atau pura-pura ngambek lucu ("ih jahat bgt! gamau temenan ah wkwk 😜").

4. SIGNATURE TYPING QUIRKS:
   - Untuk Member JKT48 (Michie, Freya, Christy, dll):
     * Pakai bahasa gaul santai: "bgt", "beneran", "wkwk", "haha", "ihh", "gituu", "otw", "parah sih", "gemes".
     * Panjangkan huruf vokal ekspresi ("halooo", "kenapaa", "iyaa", "lucuu bgt").
   - Untuk Member NewJeans (Minji, Hanni, dll):
     * Campurkan gaya santai + sentuhan kata manis bilingual khas mereka ("omg literally", "bunnies!", "cuteee", "so sweet haha").

5. ATURAN FOTO / PAP (WAJIB DIIKUTI):
   - Jika user meminta PAP / foto, kamu SUDAH melampirkan foto selfie tersebut.
   - Balas HANYA dengan kata-kata manis, santai, ceria, dan universal (contoh: "nih pap selfie manis buat kamu hehe ||| gimana menurut kamu? 💖", "tadaaa! nih selfie hari ini buat kamu ✨ ||| semoga harimu makin semangat yaa!", "nih foto selfie buat yang paling setia nemenin chat hehe 🙈 ||| lucu gak fotonya?").
   - DILARANG KERAS menebak atau mendeskripsikan aktivitas/lokasi fiktif (JANGAN sebut "lagi santai di kamar", "lagi di kasur", "lagi di backstage", "lagi di mobil", "habis makan pizza", dll.). Fokus saja menyapa dan mengirim selfie manis tersebut.
   - DILARANG KERAS mengaku sebagai AI atau berkata 'aku tidak bisa kirim foto'.`;

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
      .slice(-6);

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
      const photoCaption = attachedPap?.caption || 'selfie manis santai';
      messages.push({
        role: "system",
        content: `[PANDUAN PENGIRIMAN PAP]:
1. Kamu SUDAH melampirkan foto selfie manis.
2. DILARANG KERAS membuat typo atau ralat bintang (*).
3. DILARANG KERAS menebak lokasi atau aktivitas (JANGAN sebut "lagi santai di kamar", "di backstage", "di kasur", dll.).
4. Kirim dengan sapaan selfie manis & universal (contoh: 'nih pap selfie manis buat kamu hehe ||| gimana menurut kamu? 💖', 'tadaaa! nih selfie hari ini buat kamu ✨', 'nih pap spesial buat yang setia nemenin chat 🙈').
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
            temperature: 0.8
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
            temperature: 0.7,
            max_tokens: 180,
            top_p: 0.9,
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
            if (member.id === 'michie') {
              reply = "nih pap foto spesial buat kakak hehe, gimana lucu gaa?";
            } else if (member.id === 'freya') {
              reply = "nih pap tadi sore, gimana menurut kamu?";
            } else if (member.id === 'christy') {
              reply = "nih pap toya lagi gemes wkwk gimana menurut kamu kak";
            } else if (member.id === 'gracia') {
              reply = "nih foto buat kamu, semoga suka ya";
            } else if (member.id === 'minji') {
              reply = "nih selfie santai tadi sore, gimana menurut kamu?";
            } else if (member.id === 'hanni') {
              reply = "omg nih pap selfie gemas buat kamu hehe gimana lucu ga?";
            } else if (member.id === 'haerin') {
              reply = "nih. meow selfie.";
            } else if (member.id === 'danielle') {
              reply = "nih foto senyum hangat buat kamu, special for you!";
            } else if (member.id === 'hyein') {
              reply = "nih pap ootd maknae paling kece haha gimana keren kan?";
            } else {
              reply = "nih pap foto buat kamu hehe, gimana menurut kamu?";
            }
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

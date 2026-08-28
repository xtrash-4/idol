import os
import re

APP_PY = r"c:\Users\Hype\Desktop\IDOLCHAT\update_app_with_stories_and_avatar.py"

with open(APP_PY, "r", encoding="utf-8") as f:
    content = f.read()

# New ultra-natural dialog engine with persona quirks, emotional states, and typo asterisk engine
new_dialogue_engine = '''  // ==========================================================================
  // ULTRA-NATURAL DYNAMIC DIALOGUE ENGINE (Anti-Template, Signature Quirks & Typo)
  // ==========================================================================

  function applyNaturalTypo(bubbles) {
    // 18% chance of spontaneous natural typo and asterisk correction
    if (bubbles.length === 0 || Math.random() > 0.20) return bubbles;

    const typoMap = [
      { find: "kamu", typo: "kmu", fix: "kamu*" },
      { find: "makan", typo: "mkan", fix: "makan* typo haha" },
      { find: "banget", typo: "bgtu", fix: "bgt* wkwk" },
      { find: "kucing", typo: "kucig", fix: "kucing*" },
      { find: "cerita", typo: "crita", fix: "cerita*" },
      { find: "santai", typo: "sntai", fix: "santai*" },
      { find: "hehe", typo: "hhe", fix: "hehe*" },
      { find: "beneran", typo: "bnran", fix: "beneran* typo maap 😭" }
    ];

    const pick = typoMap[Math.floor(Math.random() * typoMap.length)];
    let firstBubble = bubbles[0];

    if (firstBubble.toLowerCase().includes(pick.find)) {
      const regex = new RegExp(pick.find, "i");
      firstBubble = firstBubble.replace(regex, pick.typo);
      const newBubbles = [firstBubble, pick.fix, ...bubbles.slice(1)];
      return newBubbles;
    }
    return bubbles;
  }

  function getFallbackDemoReply(member, userText, attachedPap = null) {
    const isNewJeans = (member.group === "NewJeans") || member.generation?.includes("NewJeans");
    const t = userText.toLowerCase();
    const id = member.id || "";

    // 1. Reply to Story Context
    if (t.includes("[membalas story:")) {
      if (isNewJeans) {
        const pool = [
          `omg thank youu bunnies! 💖 ||| seneng banget kamu notice story aku hehe ||| how are you today?`,
          `aww gemes bgt reaksimu! ||| makasih yaa udah nonton story aku ✨`,
          `hehehe iyaa tadi seru bgt! ||| lagi santai ya sekarang?`
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else {
        const pool = [
          `ihh makasih kakk udah nonton story akuu hehe 💖 ||| kamu lagi senggang ya?`,
          `wkwkwk gemes bgt reaksimu ||| seneng deh kamu notice story aku ✨`,
          `hehehe iyaa tadi seru bangett tauu ||| kamu lagi ngapain nih?`
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    // 2. Explicit PAP / Foto Request
    if (attachedPap || /pap|foto|selfie|muka|wajah/i.test(t)) {
      if (id === "michie") {
        const pool = [
          "nih pap selfie manis buat kakak hehe ||| gimana lucu gaa fotonya? 😜",
          "tadi sempet selfie santai bentar ||| spesial dikirim buat kamu doang wkwk",
          "nih selfie santai aku hari ini ||| awas naksir yaa haha 💖",
          "spesial nih pap buat kamu ||| jangan disebar-sebar yaa hehe 🤫"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (id === "freya") {
        const pool = [
          "nih selfie santai dari aku ||| gimana, keliatan seger kan fotonya? haha ✨",
          "tadi sempet foto bentar ||| spesial buat kamu, jangan lupa disimpan ya hehe",
          "nih pap hari ini ||| semoga harimu jadi lebih semangat yaa! 🤍"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (id === "christy") {
        const pool = [
          "hahaha nih pap muka aku ||| gemes kan? jangan bilang jelek ya awas lu 😝",
          "selfie random hari ini buat kamu ||| wkwk jangan ketawa liat mukaku ya!",
          "tadaaa! nih selfie aku ||| lucu ga? jawab lucu harus wajib wkwk 💖"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (isNewJeans) {
        const pool = [
          "here's a quick selfie for you bunnies! 🐰 ||| hope it brightens your day hehe ✨",
          "tadi sempet selfie bentar di backstage ||| how does it look? cute gaa? 💖",
          "special pap for you today! ||| jangan lupa senyum yaa ✨"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else {
        const pool = [
          "nih pap selfie santai dari aku hehe ||| gimana menurut kamu? 💖",
          "tadi sempet foto bentar pas selesai kegiatan ||| lucu gak fotonya? ✨",
          "spesial nih buat kamu ||| awas jangan salting yaa haha 😜"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    // 3. Gombalan / Pujian / Salting (Emotional State: Salting & Playful Flirt)
    if (/cantik|manis|gemes|lucu|jodoh|sayang|love|kangen|naksir|nikah|pacar|bidadari|gombal/i.test(t)) {
      if (id === "michie") {
        const pool = [
          "ihh apaan sih gombal mulu haha 🙈 ||| tapi makasih yaa, bikin aku senyum-senyum sendiri wkwk",
          "cieee gombalin aku yaa 😜 ||| awas loh jangan gombalin member lain juga! haha",
          "wkwkwk bisa aja kamu kakk ||| gemes bgt ketikannya, jadi salting kan aku 💖"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (id === "freya") {
        const pool = [
          "haha gombalan klasik tapi boleh juga sih 😌 ||| makasih yaa udah bikin hariku senyum",
          "wkwk santai dong gombalnya ||| ntar kalau aku salting beneran gimana coba? 😜",
          "bisa aja nih pujiannya ||| tapi aku suka denger kamu ngomong gitu hehe ✨"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (id === "christy") {
        const pool = [
          "hahaha apaan sih astaga! 🤣 ||| gombal mulu kerjanya, belajar/kerja dulu sana wkwk",
          "wkwkwk salting dikit gak ngaruh 😝 ||| tapi makasih yaa kamu manis bangett",
          "ihh jangan gitu dong kan aku jadi malu wkwk ||| awas ya gombalannya bayar 500 perak haha"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (isNewJeans) {
        const pool = [
          "omg thank you so much! you're so sweet 🙈 ||| bunnies emang paling bisa bikin salting hehe 💖",
          "aww that made my day haha! ||| thank you for the sweet words bunnies ✨🐰",
          "hehehe you're so cute! ||| jangan bikin aku blushing dong haha 💖"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else {
        const pool = [
          "ihh bisa aja deh gombalnya haha 🙈 ||| makasih yaa pujiannya, bikin semangat bangett!",
          "wkwkwk gombal mulu ya kamu ||| tapi seneng deh dengernya hehe 💖",
          "ciee bikin salting aja nih ||| awas naksir beneran loh haha 😜"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    // 4. Curhat / Capek / Mengeluh / Tugas / Kerja (Emotional State: Deep Warm Empathy)
    if (/capek|lelah|tugas|kuliah|kerja|pusing|sedih|stres|stress|bingung|cape|kesel|kecewa/i.test(t)) {
      if (id === "michie") {
        const pool = [
          "ihh jangan terlalu diforsir yaa kakk! 🥺 ||| istirahat dulu bentar, minum air putih yang banyak",
          "peluk online buat kamuu 🤗 ||| kamu udah hebat banget hari ini, jangan lupa apresiasi diri sendiri yaa!",
          "semangattt kakakku tersayang! 💖 ||| abis ini tidur yang cukup ya biar besok seger lagi hehe"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (id === "freya") {
        const pool = [
          "kerja keras boleh tapi kesehatan tetep nomor satu ya ||| tarik napas dulu, istirahat sejenak",
          "aku ngerti kok rasanya capek bgt ||| tapi kamu orang kuat, aku semangatin dari sini ya! 🤍",
          "jangan lupa makan yang enak ya hari ini ||| self-reward dikit biar pikiran fresh lagi ✨"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (isNewJeans) {
        const pool = [
          "take a deep breath bunnies 🤍 ||| you worked so hard today, please get some good rest!",
          "jangan terlalu dipikirin yaa ||| dengerin lagu santai dulu sambil rebahan, fighting! ✨🐰",
          "sending warm hugs for you! 🤗 ||| kamu udah lakuin yang terbaik hari ini, proud of you!"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else {
        const pool = [
          "ihh jangan diforsir yaa! ||| istirahat dulu sebentar, rebahan sambil dengerin musik santai 💖",
          "kamu udah berjuang hebat hari ini ||| aku semangatin terus dari sini, semangaat! ✨",
          "jangan lupa makan dan tidur yang cukup yaa ||| kesehatan kamu paling utama tauu 🤍"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    // 5. Makanan / Minuman / Udah Makan Belum
    if (/makan|laper|kenyang|minum|sarapan|sushi|boba|kopi|nasi|menu/i.test(t)) {
      const pool = [
        "aku tadi udah makan nih hehe ||| kamu udah makan belum? jangan sampai telat makan yaa!",
        "wah lagi bahas makanan jadi laper lagi wkwk ||| kamu lagi pengen makan apa nih?",
        "udah dong tadi makan yang enak bgt hehe ||| jangan lupa jaga pola makan yaa kakk! ✨"
      ];
      return pool[Math.floor(Math.random() * pool.length)];
    }

    // 6. Sapaan & Tanya Kabar / Lagi Apa
    if (/hai|halo|helo|pagi|siang|sore|malam|apa kabar|lagi apa|ngapain|kabar/i.test(t)) {
      if (id === "michie") {
        const pool = [
          "halooo kakk! ✨ ||| baru selesai beres-beres nih ||| kamu lagi apa? santai kan?",
          "ehh haloo! ||| bosen bgt mau ngobrol, untung kamu chat hehe 💖 ||| gimana harimu?",
          "haloo kakakku tersayang! ||| lagi rebahan santai nih hehe ||| kamu lagi sibuk gak?"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (id === "freya") {
        const pool = [
          "halo juga! baru selesai kegiatan nih ||| kamu lagi apa hari ini? lancar kan?",
          "haii! seneng deh kamu sapa ||| gimana harimu hari ini, seru gak? ✨",
          "halo! lagi santai sejenak nih ||| ada cerita seru apa hari ini? cerita dong hehe"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (id === "christy") {
        const pool = [
          "halooo! wkwkwk pas bgt lagi gabut nih ||| kamu lagi ngapain tuh? kepo deh 😝",
          "hai hai! baru selesai ngemil nih haha ||| gimana kabar kamu hari ini?",
          "halooo! lagi nunggu jadwal berikutnya nih ||| ngobrol yuk seru-seruan bareng! ✨"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else if (isNewJeans) {
        const pool = [
          "hello bunnies! 🐰💖 ||| baru selesai latihan dance nih, how are you today?",
          "haii! so happy to see your message hehe ||| harimu menyenangkan gak hari ini? ✨",
          "hello! lagi dengerin playlist santai nih ||| what are you doing right now?"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      } else {
        const pool = [
          "haloo! baru selesai santai nih hehe ||| kamu lagi sibuk apa hari ini?",
          "haii! seneng deh bisa ngobrol sama kamu ✨ ||| gimana kabar kamu hari ini?",
          "halo juga! lagi rebahan santai nih ||| ada cerita apa hari ini? hehe 💖"
        ];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    // 7. General Casual Conversational Pool (Dynamic Multi-Burst)
    const generalPool = [
      "wkwkwk iyaa bener bangett! ||| seru banget denger cerita kamu hehe ||| terus gimana lagi tuh kelanjutannya?",
      "haha masa sih? ||| jangan bikin aku penasaran dong wkwk ||| ceritain lebih lanjut yuk!",
      "seneng deh bisa ngobrol santai bareng kamu hari ini ✨ ||| kamu emang asik diajak ngobrol hehe",
      "wkwkwk parah bgt sih itu ||| tapi lucu bangett asli haha 🤣",
      "hehehe iyaa bener! ||| menurut kamu enaknya gimana tuh? 💖"
    ];
    return generalPool[Math.floor(Math.random() * generalPool.length)];
  }'''

# Replace getFallbackDemoReply in update_app_with_stories_and_avatar.py
pattern = r"function getFallbackDemoReply\(member, userText, attachedPap = null\) \{[\s\S]*?return variants\[Math\.floor\(Math\.random\(\) \* variants\.length\)\];\s*\}"
content = re.sub(pattern, new_dialogue_engine, content)

# In handleSendMessage, update the fallback parsing with applyNaturalTypo
content = content.replace(
    'const fallbackBubbles = (fallbackReply || "haii! hehe iyaa kakk").split("|||").map(b => b.trim()).filter(Boolean);',
    'let fallbackBubbles = (fallbackReply || "haii! hehe iyaa kakk").split("|||").map(b => b.trim()).filter(Boolean);\n        fallbackBubbles = applyNaturalTypo(fallbackBubbles);'
)

with open(APP_PY, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESS: update_app_with_stories_and_avatar.py updated with ultra-natural dialogue engine and typo engine!")

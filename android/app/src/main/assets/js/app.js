/**
 * MPRUYY HALU - Ultra-Natural Conversational Engine & Media System
 * Interaksi UI, state member, pengiriman pesan kontekstual anti-template,
 * 24-Hour Instagram Story Player, galeri PAP dinamis non-repeat, dan tombol Mulai Chat.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Auto cleanup model deprecated dari localStorage
  const savedModel = localStorage.getItem("groq_model_idolchat");
  const deprecatedModels = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "llama3-70b-8192",
    "llama3-8b-8192",
    "gemma2-9b-it",
    "mixtral-8x7b-32768"
  ];
  if (savedModel && deprecatedModels.includes(savedModel)) {
    localStorage.removeItem("groq_model_idolchat");
  }

  function getMembers() {
    try {
      const custom = JSON.parse(localStorage.getItem("idolchat_custom_members") || "[]");
      return [...(typeof DEFAULT_MEMBERS !== 'undefined' ? DEFAULT_MEMBERS : []), ...custom];
    } catch (e) {
      return typeof DEFAULT_MEMBERS !== 'undefined' ? [...DEFAULT_MEMBERS] : [];
    }
  }

  // App State
  let members = getMembers();
  let activeMember = members[0] || {};
  let userName = localStorage.getItem("jkt48_user_name") || "Fans Setia";
  let isSending = false;

  // DOM Elements - Navigation & Views
  const lobbyView = document.getElementById("lobby-view");
  const chatLayout = document.getElementById("chat-layout");
  const lobbyGrid = document.getElementById("lobby-grid");
  const lobbySearchInput = document.getElementById("lobby-search-input");
  const lobbyFilterPills = document.getElementById("lobby-filter-pills");
  const lobbyUserName = document.getElementById("lobby-user-name");
  const btnLobbySound = document.getElementById("btn-lobby-sound");
  const btnLobbyUser = document.getElementById("btn-lobby-user");
  const btnLobbySettings = document.getElementById("btn-lobby-settings");
  const btnHeaderBackLobby = document.getElementById("btn-header-back-lobby");

  // DOM Elements - Chat Area
  const chatMessagesEl = document.getElementById("chat-messages");
  const chatFormEl = document.getElementById("chat-form");
  const chatInputEl = document.getElementById("chat-input");
  const typingIndicatorEl = document.getElementById("typing-indicator");
  const typingLabelEl = document.getElementById("typing-label");
  const quickPromptsEl = document.getElementById("quick-prompts");

  // Header Elements
  const activeHeaderAvatar = document.getElementById("active-header-avatar");
  const activeHeaderName = document.getElementById("active-header-name");
  const activeHeaderGen = document.getElementById("active-header-gen");
  const activeHeaderStatus = document.getElementById("active-header-status");
  const btnRequestPap = document.getElementById("btn-request-pap");
  const btnResetChat = document.getElementById("btn-reset-chat");
  const btnOpenProfileDrawer = document.getElementById("btn-open-profile-drawer");
  const btnHeaderSettings = document.getElementById("btn-header-settings");

  // Modals & Drawers
  const modalSettings = document.getElementById("modal-settings");
  const btnOpenSettings = document.getElementById("btn-open-settings");
  const btnCloseSettings = document.getElementById("btn-close-settings");
  const btnSaveSettings = document.getElementById("btn-save-settings");
  const btnRemoveApiKey = document.getElementById("btn-remove-api-key");
  const inputGroqKey = document.getElementById("input-groq-key");
  const selectGroqModel = document.getElementById("select-groq-model");

  const modalUserProfile = document.getElementById("modal-user-profile");
  const btnCloseUserProfile = document.getElementById("btn-close-user-profile");
  const inputUserName = document.getElementById("input-user-name");
  const btnSaveUserProfile = document.getElementById("btn-save-user-profile");

  const profileDrawer = document.getElementById("profile-drawer");
  const btnCloseDrawer = document.getElementById("btn-close-drawer");
  const drawerAvatar = document.getElementById("drawer-avatar");
  const drawerName = document.getElementById("drawer-name");
  const drawerGen = document.getElementById("drawer-gen");
  const drawerJiko = document.getElementById("drawer-jiko");
  const drawerTags = document.getElementById("drawer-tags");
  const drawerGallery = document.getElementById("drawer-gallery");
  const btnClearCurrentChat = document.getElementById("btn-clear-current-chat");

  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const btnSoundToggle = document.getElementById("btn-sound-toggle");
  const btnAttachPap = document.getElementById("btn-attach-pap");

  // Story Elements
  const storyPlayerModal = document.getElementById("story-player-modal");
  const storyProgressContainer = document.getElementById("story-progress-container");
  const storyAuthorAvatar = document.getElementById("story-author-avatar");
  const storyAuthorName = document.getElementById("story-author-name");
  const storyTimestamp = document.getElementById("story-timestamp");
  const storyMainImage = document.getElementById("story-main-image");
  const storyLocationText = document.getElementById("story-location-text");
  const storyMusicText = document.getElementById("story-music-text");
  const storyTimeBadge = document.getElementById("story-sticker-time") || document.getElementById("story-time-badge");
  const storyCaptionText = document.getElementById("story-caption-text");
  const storyReplyInput = document.getElementById("story-reply-input");
  const btnSendStoryReply = document.getElementById("btn-story-send-reply") || document.getElementById("btn-send-story-reply");
  const btnCloseStory = document.getElementById("btn-story-close") || document.getElementById("btn-close-story");
  const storyPrevTouch = document.getElementById("story-tap-prev") || document.getElementById("story-prev-touch");
  const storyNextTouch = document.getElementById("story-tap-next") || document.getElementById("story-next-touch");

  let currentStoryMember = null;
  let currentStorySlideIndex = 0;
  let currentStorySlides = [];
  let storyTimer = null;
  const STORY_DURATION = 5500;

  // ==========================================================================
  // INITIALIZATION & VIEW CONTROLS
  // ==========================================================================

  function init() {
    updateUserBadgeDisplay();
    renderLobby(members);
    setupEventListeners();
    setupSoundToggles();

    if (members.length > 0) {
      setActiveMember(members[0]);
    }
  }

  function updateUserBadgeDisplay() {
    if (lobbyUserName) {
      lobbyUserName.textContent = userName || "Fans Setia";
    }
  }

  function showLobby() {
    lobbyView.classList.remove("hidden");
    chatLayout.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showChat() {
    lobbyView.classList.add("hidden");
    chatLayout.classList.remove("hidden");
    scrollToBottom();
  }

  function setActiveMember(member) {
    if (!member) return;
    activeMember = member;

    // Header updates
    activeHeaderAvatar.src = member.avatar;
    activeHeaderName.textContent = member.name;
    activeHeaderGen.textContent = member.generation;
    activeHeaderStatus.textContent = member.status || "Online";

    // Drawer updates
    drawerAvatar.src = member.avatar;
    drawerName.textContent = member.name;
    drawerGen.textContent = member.generation;
    drawerJiko.textContent = member.jikoshoukai || "-";

    // Drawer tags
    drawerTags.innerHTML = "";
    (member.tags || []).forEach(tag => {
      const sp = document.createElement("span");
      sp.className = "drawer-tag";
      sp.textContent = tag;
      drawerTags.appendChild(sp);
    });

    // Drawer gallery
    renderDrawerGallery(member);

    // Quick prompts
    renderQuickPrompts(member);

    // Load message history
    loadChatHistory(member.id);
  }

  // ==========================================================================
  // LOBBY RENDERING WITH CLEAR "MULAI CHAT" BUTTON
  // ==========================================================================

  function renderLobby(list) {
    lobbyGrid.innerHTML = "";

    if (!list || list.length === 0) {
      lobbyGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h3 style="color: var(--text-primary); margin-bottom: 6px;">Member Tidak Ditemukan</h3>
          <p style="font-size: 0.85rem;">Coba cari nama lain atau pilih grup Semua.</p>
        </div>
      `;
      return;
    }

    list.forEach(member => {
      const card = document.createElement("div");
      card.className = "lobby-card";
      card.dataset.id = member.id;

      const history = getMemberChatHistory(member.id);
      const lastMsg = history.length > 0 ? history[history.length - 1] : null;
      let previewText = "Mulai obrolan seru sekarang ✨";
      let previewTime = "";

      if (lastMsg) {
        previewText = lastMsg.content || (lastMsg.pap ? "📷 Mengirim foto selfie" : "Obrolan");
        previewTime = lastMsg.time || "";
      }

      card.innerHTML = `
        <div class="lobby-card-avatar-wrapper">
          <div class="story-ring-wrapper" data-member-id="${member.id}" title="Klik untuk lihat Story 24 Jam">
            <img src="${member.avatar}" alt="${member.name}" class="lobby-card-avatar" loading="lazy">
          </div>
          <span class="lobby-online-dot"></span>
        </div>
        <div class="lobby-card-info">
          <div class="lobby-card-top">
            <h4 class="lobby-card-name">${member.nickname || member.name}</h4>
          </div>
          <span class="lobby-card-gen">${member.group || "JKT48"} • ${member.generation}</span>
          <p class="lobby-card-jiko" title="${escapeHtml(member.jikoshoukai || '')}">"${escapeHtml(member.jikoshoukai || '')}"</p>
          <button type="button" class="btn-lobby-chat-start">
            <i class="fa-solid fa-comment-dots"></i> Mulai Chat
          </button>
        </div>
      `;

      // Event listener: click avatar opens Story, click anywhere else or button opens Chat
      card.addEventListener("click", (e) => {
        if (e.target.closest(".story-ring-wrapper")) {
          openStory(member);
        } else {
          setActiveMember(member);
          showChat();
        }
      });

      lobbyGrid.appendChild(card);
    });
  }

  // ==========================================================================
  // CHAT RENDERING & STORAGE
  // ==========================================================================

  function getMemberChatHistory(memberId) {
    try {
      return JSON.parse(localStorage.getItem(`idolchat_history_${memberId}`) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveMessageToHistory(memberId, msgObj) {
    try {
      const history = getMemberChatHistory(memberId);
      history.push(msgObj);
      if (history.length > 80) history.shift();
      localStorage.setItem(`idolchat_history_${memberId}`, JSON.stringify(history));
    } catch (e) {
      console.warn("Save history error:", e);
    }
  }

  function loadChatHistory(memberId) {
    chatMessagesEl.innerHTML = "";
    const history = getMemberChatHistory(memberId);

    if (history.length === 0) {
      // Welcome banner
      const banner = document.createElement("div");
      banner.className = "chat-welcome-banner";
      banner.innerHTML = `
        <div class="welcome-avatar-wrapper">
          <img src="${activeMember.avatar}" alt="${activeMember.name}" class="welcome-avatar">
        </div>
        <h3 class="welcome-title">${activeMember.name}</h3>
        <p class="welcome-jiko">"${activeMember.jikoshoukai || "Halo, selamat datang!"}"</p>
        <div class="welcome-badges">
          <span class="welcome-badge">${activeMember.group || "JKT48"}</span>
          <span class="welcome-badge">${activeMember.generation}</span>
          <span class="welcome-badge">⭐ ${activeMember.fandom || "Fans"}</span>
        </div>
        <p class="welcome-hint">Kirim pesan pertama kamu atau pilih saran topik di bawah 👇</p>
      `;
      chatMessagesEl.appendChild(banner);
    } else {
      history.forEach(msg => {
        appendMessageToUI(msg, false);
      });
    }

    scrollToBottom();
  }

  function appendMessageToUI(msg, animate = true) {
    const isUser = msg.role === "user";
    const msgRow = document.createElement("div");
    msgRow.className = `msg-row ${isUser ? "user" : "idol"}`;
    if (animate) msgRow.classList.add("animate-in");

    const avatarDiv = document.createElement("div");
    avatarDiv.className = "msg-avatar";

    if (isUser) {
      const userInitial = (userName || "P").trim().charAt(0).toUpperCase() || "P";
      avatarDiv.innerHTML = `<div class="user-pure-initial">${userInitial}</div>`;
    } else {
      avatarDiv.innerHTML = `<img src="${activeMember.avatar}" alt="${activeMember.name}">`;
    }

    const contentDiv = document.createElement("div");
    contentDiv.className = "msg-content";

    const bubblesContainer = document.createElement("div");
    bubblesContainer.className = "msg-bubbles";

    // 1. Render PAP / Foto jika ada
    if (msg.pap) {
      const papCard = createPapElement(msg.pap);
      bubblesContainer.appendChild(papCard);
    }

    // 2. Render Bubble Teks jika ada
    if (msg.content && msg.content.trim()) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.innerHTML = escapeHtml(msg.content);
      bubblesContainer.appendChild(bubble);
    }

    const timeDiv = document.createElement("div");
    timeDiv.className = "msg-time";
    timeDiv.textContent = msg.time || getCurrentTime();

    contentDiv.appendChild(bubblesContainer);
    contentDiv.appendChild(timeDiv);

    msgRow.appendChild(avatarDiv);
    msgRow.appendChild(contentDiv);

    chatMessagesEl.appendChild(msgRow);
  }

  function createPapElement(pap) {
    const card = document.createElement("div");
    card.className = "pap-card";
    card.innerHTML = `
      <div class="pap-img-container">
        <img src="${pap.url}" alt="${pap.caption || 'Foto Selfie'}" class="pap-img" loading="lazy">
        <div class="pap-overlay-badge">📷 PAP Spesial</div>
      </div>
      ${pap.caption ? `<div class="pap-caption">${escapeHtml(pap.caption)}</div>` : ""}
    `;

    card.addEventListener("click", () => {
      openLightbox(pap.url, pap.caption);
    });

    return card;
  }

  // ==========================================================================
  // SMART VARIED PAP POOL (100% Non-Repeating Across 35-85 Photos Per Member)
  // ==========================================================================

  const usedPapsMap = {};

  function getVariedPap(member) {
    if (!member || !member.paps || member.paps.length === 0) return null;
    if (!usedPapsMap[member.id]) {
      usedPapsMap[member.id] = new Set();
    }
    const used = usedPapsMap[member.id];
    let available = member.paps.filter(p => !used.has(p.url));

    if (available.length === 0) {
      used.clear();
      available = member.paps;
    }

    const picked = available[Math.floor(Math.random() * available.length)];
    used.add(picked.url);
    return picked;
  }

  // ==========================================================================
  // SEND MESSAGE LOGIC (Multi-Message Burst & Contextual Dialogues)
  // ==========================================================================

  async function handleSendMessage(customText = null) {
    if (isSending) return;

    const text = (customText || chatInputEl.value).trim();
    if (!text) return;

    chatInputEl.value = "";
    chatInputEl.style.height = "auto";
    isSending = true;

    // 1. Add User Message
    const userMsgObj = {
      role: "user",
      content: text,
      time: getCurrentTime()
    };
    appendMessageToUI(userMsgObj);
    saveMessageToHistory(activeMember.id, userMsgObj);
    sounds.playSend();
    scrollToBottom();

    // 2. Show Typing Indicator
    showTypingIndicator(true);

    let attachedPap = null;
    const isAskingPap = /pap|foto|selfie|liat muka|lihat muka|minta foto|kirim foto|fotoin|coba foto|spill/i.test(text);

    if (isAskingPap) {
      attachedPap = getVariedPap(activeMember);
    }

    try {
      let reply = "";

      if (groqService.hasApiKey()) {
        const history = getMemberChatHistory(activeMember.id);
        reply = await groqService.sendChat(activeMember, history, text, userName, attachedPap);
      } else {
        await new Promise(r => setTimeout(r, 800));
        reply = getFallbackDemoReply(activeMember, text, attachedPap);
      }

      if (reply.includes("[PAP]")) {
        reply = reply.replace(/\[PAP\]/gi, "").trim();
        if (!attachedPap && isAskingPap) {
          attachedPap = getVariedPap(activeMember);
        }
      }

      let bubbles = reply
        .split("|||")
        .map(s => s.trim())
        .filter(Boolean);

      if (bubbles.length === 0) {
        bubbles = [reply.trim() || "iyaa kak hehe"];
      }

      // Render Multi-Message Burst
      for (let i = 0; i < bubbles.length; i++) {
        const bubbleText = bubbles[i];
        const isLast = i === bubbles.length - 1;
        const msgPap = isLast ? attachedPap : null;

        if (i > 0) {
          showTypingIndicator(true);
          const typingDelay = Math.min(1300, Math.max(600, bubbleText.length * 28));
          await new Promise(r => setTimeout(r, typingDelay));
        }

        showTypingIndicator(false);

        const idolMsgObj = {
          role: "assistant",
          content: bubbleText,
          time: getCurrentTime(),
          pap: msgPap
        };

        appendMessageToUI(idolMsgObj);
        saveMessageToHistory(activeMember.id, idolMsgObj);
        sounds.playReceive();
        scrollToBottom();
      }

      refreshMemberViews();
    } catch (err) {
      console.warn("[CHAT ENGINE] Fallback active:", err.message);
      try {
        const fallbackReply = getFallbackDemoReply(activeMember, text, attachedPap);
        let fallbackBubbles = (fallbackReply || "haii! hehe iyaa kakk").split("|||").map(b => b.trim()).filter(Boolean);

        for (let i = 0; i < fallbackBubbles.length; i++) {
          const bubbleText = fallbackBubbles[i];
          const isLast = i === fallbackBubbles.length - 1;
          const msgPap = isLast ? attachedPap : null;

          if (i > 0) {
            showTypingIndicator(true);
            await new Promise(r => setTimeout(r, 600));
          }
          showTypingIndicator(false);

          const idolMsgObj = {
            role: "assistant",
            content: bubbleText,
            time: getCurrentTime(),
            pap: msgPap
          };

          appendMessageToUI(idolMsgObj);
          saveMessageToHistory(activeMember.id, idolMsgObj);
          sounds.playReceive();
          scrollToBottom();
        }
        refreshMemberViews();
      } catch (fallbackErr) {
        console.error("Fallback error:", fallbackErr);
      }
    } finally {
      showTypingIndicator(false);
      isSending = false;
    }
  }

  // ==========================================================================
  // NATURAL CONTEXTUAL DIALOGUE ENGINE (NO ARTIFICIAL TYPO, RICH CASUAL TEXTING)
  // ==========================================================================

  const usedRepliesMap = {};

  function pickDeck(key, pool) {
    if (!usedRepliesMap[key]) {
      usedRepliesMap[key] = new Set();
    }
    const used = usedRepliesMap[key];
    let available = pool.filter(item => !used.has(item));
    if (available.length === 0) {
      used.clear();
      available = pool;
    }
    const picked = available[Math.floor(Math.random() * available.length)];
    used.add(picked);
    return picked;
  }

  function getFallbackDemoReply(member, userText, attachedPap = null) {
    const isNewJeans = (member.group === "NewJeans") || member.generation?.includes("NewJeans");
    const t = userText.toLowerCase();
    const id = member.id || "";

    // 1. Reply to Story Context
    if (t.includes("[membalas story:")) {
      if (isNewJeans) {
        return pickDeck(`${id}_story`, [
          `thank you so much bunnies! 💖 ||| seneng banget kamu notice story aku hehe ||| how are you today?`,
          `aww gemes banget reaksimu! ||| makasih yaa udah selalu nonton story aku ✨ ||| lagi santai kan sekarang?`,
          `hehehe iyaa tadi seru banget pas take foto itu! ||| kamu udah makan belum hari ini? 🐰`
        ]);
      } else {
        return pickDeck(`${id}_story`, [
          `ihh makasih kakk udah notice story akuu hehe 💖 ||| kamu lagi senggang ya?`,
          `wkwkwk gemes banget reaksimu ||| seneng deh ada yang selalu nonton story aku ✨ ||| lagi ngapain nih?`,
          `hehehe iyaa tadi seru bangett tauu pas difoto ||| gimana hari kamu hari ini? lancar kan?`
        ]);
      }
    }

    // 2. PAP / Foto Requests (Pure, Authentic Idol Dialogue WITHOUT Guessing Locations/Activities)
    if (attachedPap || /pap|foto|selfie|muka|wajah|ootd|spill/i.test(t)) {
      if (id === "michie") {
        return pickDeck(`${id}_pap_gen`, [
          `nih pap selfie manis buat kakak hehe ||| gimana lucu gak fotonya? 😜 ||| jangan disebar-sebar yaa wkwk`,
          `tadi sempet selfie santai bentar ||| spesial dikirim buat kamu doang nih hehe 💖 ||| gimana menurut kamu?`,
          `tadaaa! nih selfie manis hari ini buat kamu ✨ ||| manis kan? hehe`,
          `nih pap selfie buat kamu! awas jangan salting yaa 😜 ||| semoga bikin harimu makin semangat! 💖`,
          `nih foto selfie buat yang paling setia nemenin chat hehe 🙈 ||| lucu gak fotonya?`
        ]);
      } else if (id === "freya") {
        return pickDeck(`${id}_pap_gen`, [
          `nih selfie santai dari aku ||| gimana, keliatan seger kan fotonya? haha ✨ ||| semoga harimu makin semangat ya!`,
          `tadi sempet foto selfie santai bentar ||| spesial buat kamu, jangan lupa disimpan ya hehe 🤍`,
          `tadaaa! nih selfie manis hari ini ✨ ||| jangan lupa senyum juga ya kamu!`,
          `nih pap foto santai dari aku hehe ||| gimana menurut kamu? manis gak? 💖`
        ]);
      } else if (id === "christy") {
        return pickDeck(`${id}_pap_gen`, [
          `hahaha nih pap selfie muka toya 😝 ||| gemes kan? wajib bilang cantik pokoknya wkwk 💖`,
          `tadaaa! selfie toya hari ini buat kamu ||| lucu gak fotoku? wkwk 💖`,
          `nih pap selfie buat kamu! awas kangen ya wkwk 😜 ||| lagi apa kamu sekarang?`
        ]);
      } else if (id === "gracia") {
        return pickDeck(`${id}_pap_gen`, [
          `nih selfie manis dari aku 🌻 ||| semoga senyuman ini bikin harimu makin ceria yaa! ✨`,
          `spesial buat kamu yang selalu setia dukung aku 🤍 ||| disimpan baik-baik yaa hehe`
        ]);
      } else if (id === "ella") {
        return pickDeck(`${id}_pap_gen`, [
          `tadaaa! selfie cabe rawit siap menyemangati harimu 🌶️✨ ||| lucu kan wkwk 💖`,
          `nih pap selfie santai dari aku hehe ||| gimana, imut gak fotonya? 😜`
        ]);
      } else if (id === "gita") {
        return pickDeck(`${id}_pap_gen`, [
          `nih foto selfie santai dari aku 🤍 ||| semoga harimu menyenangkan ya.`,
          `tadi sempet selfie bentar ||| spesial buat kamu, disimpan ya. ✨`
        ]);
      } else if (id === "marsha") {
        return pickDeck(`${id}_pap_gen`, [
          `nih selfie manis permen kapas buat kamu 🍬✨ ||| semoga suka yaa hehe 💖`,
          `tadaaa! pap selfie santai dari aku ||| gemes gak menurut kamu? 🤍`
        ]);
      } else if (id === "muthe") {
        return pickDeck(`${id}_pap_gen`, [
          `nih senyuman mutiara hari ini buat kamu ☀️✨ ||| semoga harimu makin cerah yaa!`,
          `tadaaa! pap selfie manis dari aku ||| semangaat terus buat hari ini yaa 💖`
        ]);
      } else if (isNewJeans) {
        return pickDeck(`${id}_pap_gen`, [
          `here's a special selfie for you bunnies! 🐰✨ ||| hope it makes your day brighter hehe 💖`,
          `tadaaa! selfie hari ini buat kamu 🎧✨ ||| how does it look? cute gaa? 💖`,
          `quick selfie for bunnies! ||| sweet smiles for you ✨🐰 ||| what are you doing right now?`
        ]);
      } else {
        return pickDeck(`${id}_pap_gen`, [
          `nih pap selfie santai dari aku hehe ||| gimana menurut kamu? 💖 ||| semoga suka yaa!`,
          `tadi sempet foto selfie bentar ||| spesial buat kamu nih ✨`,
          `tadaaa! selfie manis hari ini ✌️ ||| semoga bikin harimu makin semangat ya!`
        ]);
      }
    }

    // 3. Gombalan / Pujian / Rayuan / Salting
    if (/cantik|manis|gemes|lucu|jodoh|sayang|love|kangen|naksir|nikah|pacar|bidadari|gombal|imut|sempurna|cakep/i.test(t)) {
      if (id === "michie") {
        return pickDeck(`${id}_gombal`, [
          `ihh apaan sih gombal mulu haha 🙈 ||| tapi makasih yaa, bikin aku senyum-senyum sendiri wkwk ||| awas jangan gombalin member lain juga ya! 😜`,
          `cieee gombalin aku yaa 😜 ||| ketauan awas lu haha ||| tapi gemes banget ketikannya, jadi salting kan aku 💖`,
          `wkwkwk bisa aja kamu kakk ||| seneng deh ada yang selalu support dan bikin salting gini hehe 🙈`
        ]);
      } else if (id === "freya") {
        return pickDeck(`${id}_gombal`, [
          `haha gombalan klasik tapi boleh juga sih 😌 ||| makasih yaa udah bikin hariku senyum ||| ntar kalau aku baper gimana coba? wkwk`,
          `bisa aja nih pujiannya ||| tapi aku suka denger kamu ngomong gitu hehe ✨ ||| kamu sendiri gimana harinya?`
        ]);
      } else if (id === "christy") {
        return pickDeck(`${id}_gombal`, [
          `hahaha apaan sih toya! 🤣 ||| gombal mulu kerjanya wkwk ||| tapi makasih yaa kamu manis bangett 💖`,
          `wkwkwk salting dikit gak ngaruh 😝 ||| tapi tetep bikin senyum sih haha ||| awas ya gombalannya bayar 500 perak wkwk`
        ]);
      } else if (id === "gracia") {
        return pickDeck(`${id}_gombal`, [
          `makasih yaa kata-kata manisnya 🤍 ||| selalu seneng denger perhatian dari kamu ||| kamu juga jaga kesehatan yaa ✨`
        ]);
      } else if (id === "ella") {
        return pickDeck(`${id}_gombal`, [
          `wkwkwk gombal terosss! cabe rawit nih senggol bacok haha 😝 ||| tapi makasih yaa hehe bikin seneng deh 💖`
        ]);
      } else if (id === "gita") {
        return pickDeck(`${id}_gombal`, [
          `haha makasih ya. tumben gombal 😌 ||| tapi seneng kok dengernya. kamu apa kabar hari ini?`
        ]);
      } else if (isNewJeans) {
        return pickDeck(`${id}_gombal`, [
          `omg thank you so much! you're so sweet 🙈 ||| bunnies emang paling bisa bikin salting hehe 💖 ||| you made my day!`,
          `aww that's so sweet haha! ||| thank you for the sweet words bunnies ✨🐰 ||| sending you lots of love!`
        ]);
      } else {
        return pickDeck(`${id}_gombal`, [
          `ihh bisa aja deh gombalnya haha 🙈 ||| makasih yaa pujiannya, bikin semangat bangett! ||| kamu lagi apa sekarang?`,
          `cieee bikin salting aja nih ||| awas naksir beneran loh haha 😜 ||| makasih yaa selalu semangatin aku 💖`
        ]);
      }
    }

    // 4. Curhat / Capek / Lelah / Tugas / Ujian / Kerja / Stres / Sedih
    if (/capek|lelah|tugas|kuliah|kerja|pusing|sedih|stres|stress|bingung|cape|kesel|kecewa|sakit|drop/i.test(t)) {
      if (id === "michie") {
        return pickDeck(`${id}_curhat`, [
          `ihh jangan terlalu diforsir yaa kakk! 🥺 ||| istirahat dulu bentar, minum air putih yang banyak ||| kamu udah hebat banget hari ini tauu!`,
          `peluk hangat dari jauh buat kamuu 🤗 ||| kamu udah berjuang keras banget hari ini, bangga deh sama kamu! ||| abis ini istirahat yang cukup yaa 💖`,
          `semangattt kakakku tersayang! ✨ ||| kalau lagi pusing, rehat sejenak sambil dengerin lagu santai yuk ||| aku semangatin terus dari sini!`
        ]);
      } else if (id === "freya") {
        return pickDeck(`${id}_curhat`, [
          `kerja keras boleh tapi kesehatan tetep nomor satu ya ||| tarik napas dulu, istirahat sejenak 🤍 ||| kamu orang kuat, aku semangatin dari sini ya!`,
          `jangan lupa makan yang enak ya hari ini ||| self-reward dikit biar pikiran fresh lagi ✨ ||| kalau ada yang mau diceritain, cerita aja yaa`
        ]);
      } else if (isNewJeans) {
        return pickDeck(`${id}_curhat`, [
          `take a deep breath bunnies 🤍 ||| you worked so hard today, please get some good rest! ||| we're always rooting for you ✨🐰`,
          `jangan terlalu dipikirin yaa ||| dengerin lagu santai dulu sambil rebahan, fighting! ✨🐰 ||| you did amazing today!`
        ]);
      } else {
        return pickDeck(`${id}_curhat`, [
          `ihh jangan diforsir yaa! ||| istirahat dulu sebentar, rebahan sambil dengerin musik santai 💖 ||| kamu udah berjuang hebat hari ini!`,
          `kamu udah lakuin yang terbaik hari ini ✨ ||| aku semangatin terus dari sini, semangaat yaa! 🤍`
        ]);
      }
    }

    // 5. Makanan / Minuman
    if (/makan|laper|kenyang|minum|sarapan|sushi|boba|kopi|nasi|menu|bakso|seblak|ramen|mie/i.test(t)) {
      return pickDeck(`${id}_makan`, [
        `aku tadi udah makan nih hehe 🍱 ||| kamu udah makan belum? jangan sampai telat makan yaa kakk! ||| lagi pengen makan apa emangnya?`,
        `wah lagi bahas makanan jadi laper lagi wkwk 🤤 ||| kamu biasanya suka makan apa nih kalau lagi santai?`,
        `udah dong tadi makan yang enak banget hehe ||| jangan lupa jaga pola makan dan minum air putih yaa! ✨`
      ]);
    }

    // 6. Sapaan Waktu & Tanya Kabar / Lagi Apa
    if (/pagi|siang|sore|malam|subuh|hai|halo|helo|apa kabar|lagi apa|ngapain|kabar/i.test(t)) {
      if (/pagi/i.test(t)) {
        return pickDeck(`${id}_pagi`, [
          `selamat pagi kakk! ☀️ ||| semangat buat aktivitas hari ini yaa! ||| udah sarapan belum nih?`,
          `pagi! seneng deh disapa pagi-pagi gini hehe ✨ ||| semoga harimu lancar dan menyenangkan yaa!`
        ]);
      }
      if (/malam|tidur/i.test(t)) {
        return pickDeck(`${id}_malam`, [
          `selamat malam kakk! 🌙 ||| udah selesai semua aktivitas hari ini? ||| jangan begadang yaa, istirahat yang cukup ✨`,
          `malem! baru selesai bersih-bersih nih hehe ||| kamu lagi santai kan sekarang? good night yaa kalau mau tidur! 💖`
        ]);
      }

      if (id === "michie") {
        return pickDeck(`${id}_sapa`, [
          `halooo kakk! ✨ ||| baru selesai beres-beres nih ||| kamu lagi apa? santai kan?`,
          `ehh haloo! ||| bosen banget mau ngobrol, untung kamu chat hehe 💖 ||| gimana kabar kamu hari ini? lancar?`,
          `haloo kakakku tersayang! ||| lagi rebahan santai nih hehe ||| kamu lagi sibuk apa hari ini?`
        ]);
      } else if (id === "freya") {
        return pickDeck(`${id}_sapa`, [
          `halo juga! baru selesai kegiatan nih ||| kamu lagi apa hari ini? lancar kan?`,
          `haii! seneng deh kamu sapa ✨ ||| gimana harimu hari ini, ada cerita seru apa? cerita dong hehe`
        ]);
      } else if (id === "christy") {
        return pickDeck(`${id}_sapa`, [
          `halooo! wkwkwk pas banget lagi gabut nih 😝 ||| kamu lagi ngapain tuh? kepo deh!`,
          `hai hai! baru selesai ngemil nih haha ||| gimana kabar kamu hari ini? seru gak?`
        ]);
      } else if (isNewJeans) {
        return pickDeck(`${id}_sapa`, [
          `hello bunnies! 🐰💖 ||| baru selesai latihan dance nih, how are you today?`,
          `haii! so happy to see your message hehe ||| harimu menyenangkan gak hari ini? ✨`
        ]);
      } else {
        return pickDeck(`${id}_sapa`, [
          `haloo! baru selesai santai nih hehe ||| kamu lagi sibuk apa hari ini?`,
          `haii! seneng deh bisa ngobrol sama kamu ✨ ||| gimana kabar kamu hari ini? lancar kan?`
        ]);
      }
    }

    // 7. Teater / Lagu / Konser
    if (/teater|theater|setlist|konser|show|lagu|nyanyi|dance|pajama|ramune|aturan anti cinta|rapsodi|heavy rotation|hype boy|ditto|omg/i.test(t)) {
      if (isNewJeans) {
        return pickDeck(`${id}_music`, [
          `omg kamu suka lagu itu juga? 🎧✨ ||| kita sering banget latihan choreography-nya di studio! ||| part mana yang paling kamu suka?`,
          `lagu itu emang vibes-nya seru banget yaa! ||| dengerin terus sambil santai ya bunnies 🐰💖`
        ]);
      } else {
        return pickDeck(`${id}_music`, [
          `wahh kamu sering nonton teater juga ya? 💃✨ ||| seru banget pas chant bareng penonton! ||| kapan-kapan nonton show aku yaa hehe`,
          `lagu itu salah satu favorit aku juga tauu! ||| pas bawain di panggung energinya berasa banget 💖 ||| kamu paling suka unit song apa?`
        ]);
      }
    }

    // 8. Candaan / Jokes
    if (/wkwk|haha|hehe|lucu|ngakak|ribut|iseng|jail|bercanda/i.test(t)) {
      return pickDeck(`${id}_jokes`, [
        `wkwkwk parah banget kamu! 🤣 ||| ngajak ribut ya ceritanya? wkwk ||| tapi becanda deng haha, seru ngobrol sama kamu`,
        `hahaha ada-ada aja kelakuanmu ||| bikin aku ngakak beneran tau gak 😆 ||| terus gimana lagi tuh ceritanya?`,
        `wkwkwk jahat banget! gamau temenan ah 😜 ||| tapi boong, mana bisa aku ngambek ke kamu haha 💖`
      ]);
    }

    // 9. General Casual Conversational Deck
    return pickDeck(`${id}_general`, [
      `wkwkwk iyaa bener bangett! ||| seru banget denger cerita kamu hehe ||| terus gimana lagi tuh kelanjutannya?`,
      `haha masa sih? ||| jangan bikin aku penasaran dong wkwk ||| ceritain lebih lengkap yuk!`,
      `seneng deh bisa ngobrol santai bareng kamu hari ini ✨ ||| kamu emang asik diajak ngobrol hehe ||| ada cerita apa lagi nih?`,
      `hehehe iyaa bener! ||| menurut kamu enaknya gimana tuh? 💖`
    ]);
  }

  // ==========================================================================
  // INSTAGRAM / WEVERSE 24-HOUR STORY PLAYER ENGINE
  // ==========================================================================

  function getMemberStories(member) {
    const paps = member.paps || [];
    const isNewJeans = (member.group === "NewJeans") || member.generation?.includes("NewJeans");
    const location = isNewJeans ? "HYBE Studio, Seoul" : "JKT48 Theater, FX Sudirman";
    const songs = isNewJeans
      ? ["Hype Boy • NewJeans", "Ditto • NewJeans", "Super Shy • NewJeans", "OMG • NewJeans", "How Sweet • NewJeans"]
      : ["Heavy Rotation • JKT48", "Rapsodi • JKT48", "Fortune Cookie • JKT48", "Kimi no Koto ga Suki Dakara • JKT48", "Seventeen • JKT48"];

    const song = songs[Math.floor(Math.random() * songs.length)];

    const captionsPool = isNewJeans
      ? [
          `Bunnies! How's your day? Semoga harimu menyenangkan yaa ✨🐰`,
          `Dance practice dulu hari ini, semangaat! 💃💖`,
          `Dengerin playlist santai dulu sambil istirahat 🎧`,
          `Nite nite bunnies, mimpi indah yaa semuanya! 🌙✨`,
          `Spill ootd santai hari ini, gimana gemes ga? 😜🤍`,
          `Selfie santai sebelum lanjut jadwal berikutnya ✨`
        ]
      : [
          `Semangat buat hari ini semuanya, jangan lupa tersenyum yaa ✨💖`,
          `GR teater hari ini seru bangett, sampai ketemu nanti malam! 💃✨`,
          `Lagi istirahat bentar nih sambil santai, kalian lagi apa? ☕`,
          `Selamat istirahat semuanya, terima kasih buat hari ini yaa 🌙🤍`,
          `Selfie hari ini buat kalian hehe, gemes gaa? 😜✨`,
          `Ootd santai sebelum ke teater nih hehe 👗✨`
        ];

    const shuffledPaps = [...paps].sort(() => Math.random() - 0.5);
    const shuffledCaptions = [...captionsPool].sort(() => Math.random() - 0.5);

    const slide1Img = shuffledPaps[0]?.url || member.avatar;
    const slide2Img = shuffledPaps[1]?.url || member.avatar;
    const slide3Img = shuffledPaps[2]?.url || member.avatar;
    const slide4Img = shuffledPaps[3]?.url || member.avatar;

    return [
      {
        image: slide1Img,
        caption: shuffledCaptions[0] || captionsPool[0],
        location: location,
        music: song,
        time: "11:20",
        timeAgo: "4 jam lalu"
      },
      {
        image: slide2Img,
        caption: shuffledCaptions[1] || captionsPool[1],
        location: location,
        music: song,
        time: "14:45",
        timeAgo: "2 jam lalu"
      },
      {
        image: slide3Img,
        caption: shuffledCaptions[2] || captionsPool[2],
        location: isNewJeans ? "Seoul, South Korea" : "Jakarta, Indonesia",
        music: song,
        time: "16:30",
        timeAgo: "45 menit lalu"
      },
      {
        image: slide4Img,
        caption: shuffledCaptions[3] || captionsPool[3],
        location: location,
        music: song,
        time: "18:10",
        timeAgo: "Baru saja"
      }
    ];
  }

  function openStory(member, startSlide = 0) {
    currentStoryMember = member;
    currentStorySlides = getMemberStories(member);
    currentStorySlideIndex = startSlide;

    storyAuthorAvatar.src = member.avatar;
    storyAuthorName.textContent = member.name;
    storyReplyInput.placeholder = `Kirim balasan ke ${member.nickname || member.name}...`;
    storyReplyInput.value = "";

    storyPlayerModal.classList.add("active");
    renderStorySlide(currentStorySlideIndex);
  }

  function renderStorySlide(index) {
    if (!currentStorySlides || index < 0 || index >= currentStorySlides.length) {
      closeStory();
      return;
    }

    currentStorySlideIndex = index;
    const slide = currentStorySlides[index];

    // 1. Render Progress Bars
    storyProgressContainer.innerHTML = "";
    currentStorySlides.forEach((_, i) => {
      const bar = document.createElement("div");
      bar.className = "story-progress-bar";
      const fill = document.createElement("div");
      fill.className = "story-progress-fill";
      if (i < index) {
        fill.classList.add("completed");
      } else if (i === index) {
        fill.classList.add("active");
      }
      bar.appendChild(fill);
      storyProgressContainer.appendChild(bar);
    });

    // 2. Set Media & Overlays
    storyMainImage.src = slide.image;
    storyTimestamp.textContent = slide.timeAgo;
    storyLocationText.textContent = slide.location;
    storyMusicText.textContent = slide.music;
    if (storyTimeBadge) storyTimeBadge.textContent = slide.time;
    storyCaptionText.textContent = slide.caption;

    // 3. Reset and Start Timer
    if (storyTimer) clearTimeout(storyTimer);
    storyTimer = setTimeout(() => {
      nextStorySlide();
    }, STORY_DURATION);
  }

  function nextStorySlide() {
    if (currentStorySlideIndex < currentStorySlides.length - 1) {
      renderStorySlide(currentStorySlideIndex + 1);
    } else {
      closeStory();
    }
  }

  function prevStorySlide() {
    if (currentStorySlideIndex > 0) {
      renderStorySlide(currentStorySlideIndex - 1);
    }
  }

  function closeStory() {
    if (storyTimer) clearTimeout(storyTimer);
    storyPlayerModal.classList.remove("active");
  }

  // ==========================================================================
  // QUICK PROMPTS & DRAWER GALLERY
  // ==========================================================================

  function renderQuickPrompts(member) {
    quickPromptsEl.innerHTML = "";
    const isNewJeans = (member.group === "NewJeans") || member.generation?.includes("NewJeans");

    const prompts = isNewJeans
      ? [
          { text: "Minta PAP selfie dong 📸", msg: "Bunnies minta pap selfie manis kamu hari ini dong hehe 📸" },
          { text: "Lagi latihan apa hari ini? 💃", msg: "Lagi latihan dance apa hari ini di studio? 💃" },
          { text: "Cantik bangett hari ini 💖", msg: "Kamu cantik dan manis bangett hari ini 💖" },
          { text: "Dengerin lagu apa? 🎧", msg: "Lagi dengerin playlist lagu apa nih yang enak? 🎧" }
        ]
      : [
          { text: "Minta PAP selfie dong 📸", msg: "Minta pap selfie manis kamu hari ini dong hehe 📸" },
          { text: "Semangat teaternya! ✨", msg: "Semangat buat kegiatan teater hari ini yaa! ✨" },
          { text: "Cantik bangett hari ini 💖", msg: "Kamu cantik dan manis bangett hari ini 💖" },
          { text: "Udah makan belum? 🍱", msg: "Udah makan siang/malam belum nih? Jaga kesehatan yaa 🍱" }
        ];

    prompts.forEach(p => {
      const btn = document.createElement("button");
      btn.className = "quick-prompt-btn";
      btn.type = "button";
      btn.textContent = p.text;
      btn.addEventListener("click", () => {
        handleSendMessage(p.msg);
      });
      quickPromptsEl.appendChild(btn);
    });
  }

  function renderDrawerGallery(member) {
    drawerGallery.innerHTML = "";
    const paps = member.paps || [];

    if (paps.length === 0) {
      drawerGallery.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 20px;">Belum ada koleksi foto.</p>`;
      return;
    }

    paps.forEach(p => {
      const item = document.createElement("div");
      item.className = "drawer-gallery-item";
      item.innerHTML = `<img src="${p.url}" alt="${p.caption || 'Foto'}" loading="lazy">`;
      item.addEventListener("click", () => {
        openLightbox(p.url, p.caption);
      });
      drawerGallery.appendChild(item);
    });
  }

  // ==========================================================================
  // LIGHTBOX & SOUND TOGGLE
  // ==========================================================================

  function openLightbox(url, caption) {
    lightboxImg.src = url;
    lightboxCaption.textContent = caption || "";
    lightboxModal.classList.add("active");
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
  }

  function setupSoundToggles() {
    const isMuted = sounds.isMuted();
    updateSoundBtnState(btnSoundToggle, isMuted);
    updateSoundBtnState(btnLobbySound, isMuted);
  }

  function updateSoundBtnState(btn, isMuted) {
    if (!btn) return;
    if (isMuted) {
      btn.classList.add("muted");
      btn.title = "Suara Nonaktif (Klik untuk aktifkan)";
    } else {
      btn.classList.remove("muted");
      btn.title = "Suara Aktif (Klik untuk nonaktifkan)";
    }
  }

  function toggleSoundGlobal() {
    const muted = sounds.toggleMute();
    updateSoundBtnState(btnSoundToggle, muted);
    updateSoundBtnState(btnLobbySound, muted);
  }

  // ==========================================================================
  // EVENT LISTENERS SETUP
  // ==========================================================================

  function setupEventListeners() {
    btnHeaderBackLobby.addEventListener("click", () => {
      showLobby();
      refreshMemberViews();
    });

    chatFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSendMessage();
    });

    chatInputEl.addEventListener("input", () => {
      chatInputEl.style.height = "auto";
      chatInputEl.style.height = Math.min(chatInputEl.scrollHeight, 120) + "px";
    });

    chatInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });

    if (btnRequestPap) {
      btnRequestPap.addEventListener("click", () => {
        handleSendMessage("Boleh minta pap selfie manis kamu sekarang dong? 📸");
      });
    }

    if (btnAttachPap) {
      btnAttachPap.addEventListener("click", () => {
        handleSendMessage("Pap selfie hari ini dong hehe 📸");
      });
    }

    if (btnResetChat) {
      btnResetChat.addEventListener("click", () => {
        if (confirm(`Bersihkan obrolan dengan ${activeMember.name}?`)) {
          localStorage.removeItem(`idolchat_history_${activeMember.id}`);
          loadChatHistory(activeMember.id);
          refreshMemberViews();
        }
      });
    }

    btnOpenProfileDrawer.addEventListener("click", () => {
      profileDrawer.classList.add("active");
    });
    btnCloseDrawer.addEventListener("click", () => {
      profileDrawer.classList.remove("active");
    });

    btnClearCurrentChat.addEventListener("click", () => {
      if (confirm(`Hapus seluruh riwayat chat dengan ${activeMember.name}?`)) {
        localStorage.removeItem(`idolchat_history_${activeMember.id}`);
        loadChatHistory(activeMember.id);
        profileDrawer.classList.remove("active");
        refreshMemberViews();
      }
    });

    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal || e.target.classList.contains("lightbox-close")) {
        closeLightbox();
      }
    });

    if (btnCloseStory) btnCloseStory.addEventListener("click", closeStory);
    if (storyPrevTouch) storyPrevTouch.addEventListener("click", prevStorySlide);
    if (storyNextTouch) storyNextTouch.addEventListener("click", nextStorySlide);

    if (btnSendStoryReply) {
      btnSendStoryReply.addEventListener("click", () => {
        const replyVal = storyReplyInput.value.trim();
        if (!replyVal) return;
        closeStory();
        if (activeMember.id !== currentStoryMember.id) {
          setActiveMember(currentStoryMember);
        }
        showChat();
        handleSendMessage(`[Membalas Story: "${currentStorySlides[currentStorySlideIndex]?.caption || 'Story'}"] ${replyVal}`);
      });
    }

    storyReplyInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (btnSendStoryReply) btnSendStoryReply.click();
      }
    });

    document.querySelectorAll(".btn-story-emoji").forEach(btn => {
      btn.addEventListener("click", () => {
        const emoji = btn.dataset.emoji || "💖";
        closeStory();
        if (activeMember.id !== currentStoryMember.id) {
          setActiveMember(currentStoryMember);
        }
        showChat();
        handleSendMessage(`[Membalas Story: "${currentStorySlides[currentStorySlideIndex]?.caption || 'Story'}"] ${emoji}`);
      });
    });

    if (btnSoundToggle) btnSoundToggle.addEventListener("click", toggleSoundGlobal);
    if (btnLobbySound) btnLobbySound.addEventListener("click", toggleSoundGlobal);

    lobbySearchInput.addEventListener("input", () => {
      filterLobbyMembers();
    });

    lobbyFilterPills.querySelectorAll(".pill").forEach(pill => {
      pill.addEventListener("click", () => {
        lobbyFilterPills.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        filterLobbyMembers();
      });
    });

    // Group Switcher Tabs
    const groupSwitcher = document.getElementById("group-switcher-tabs");
    if (groupSwitcher) {
      groupSwitcher.querySelectorAll(".group-tab-btn").forEach(tab => {
        tab.addEventListener("click", () => {
          groupSwitcher.querySelectorAll(".group-tab-btn").forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          filterLobbyMembers();
        });
      });
    }

    const openSettings = () => {
      inputGroqKey.value = groqService.getApiKey();
      populateModelDropdown();
      modalSettings.classList.add("active");
    };

    if (btnOpenSettings) btnOpenSettings.addEventListener("click", openSettings);
    if (btnLobbySettings) btnLobbySettings.addEventListener("click", openSettings);
    if (btnHeaderSettings) btnHeaderSettings.addEventListener("click", openSettings);
    if (btnCloseSettings) btnCloseSettings.addEventListener("click", () => modalSettings.classList.remove("active"));

    if (btnSaveSettings) {
      btnSaveSettings.addEventListener("click", () => {
        const key = inputGroqKey.value.trim();
        const model = selectGroqModel.value;
        groqService.setApiKey(key);
        groqService.setModel(model);
        modalSettings.classList.remove("active");
        alert("Pengaturan API AI berhasil disimpan!");
      });
    }

    if (btnRemoveApiKey) {
      btnRemoveApiKey.addEventListener("click", () => {
        groqService.setApiKey("");
        inputGroqKey.value = "";
        alert("API Key berhasil dihapus. Aplikasi kembali ke mode Offline Natural Dialogue!");
      });
    }

    const openUserProfile = () => {
      inputUserName.value = userName;
      modalUserProfile.classList.add("active");
    };

    if (btnLobbyUser) btnLobbyUser.addEventListener("click", openUserProfile);
    if (btnCloseUserProfile) btnCloseUserProfile.addEventListener("click", () => modalUserProfile.classList.remove("active"));
    if (btnSaveUserProfile) {
      btnSaveUserProfile.addEventListener("click", () => {
        const val = inputUserName.value.trim() || "Fans Setia";
        userName = val;
        localStorage.setItem("jkt48_user_name", userName);
        updateUserBadgeDisplay();
        modalUserProfile.classList.remove("active");
        refreshMemberViews();
      });
    }
  }

  function filterLobbyMembers() {
    const q = (lobbySearchInput.value || "").toLowerCase().trim();
    const groupTab = document.querySelector("#group-switcher-tabs .group-tab-btn.active");
    const activeGroup = groupTab ? groupTab.dataset.group : "ALL";

    const filtered = members.filter(m => {
      const matchQuery = (m.name || "").toLowerCase().includes(q) ||
                         (m.nickname || "").toLowerCase().includes(q) ||
                         (m.generation || "").toLowerCase().includes(q);

      const mGroup = (m.group || (m.generation?.includes("NewJeans") ? "NewJeans" : "JKT48"));
      let matchGroup = true;
      if (activeGroup === "JKT48") matchGroup = (mGroup.toUpperCase() === "JKT48");
      else if (activeGroup === "NewJeans") matchGroup = (mGroup.toUpperCase() === "NEWJEANS");

      return matchQuery && matchGroup;
    });

    renderLobby(filtered);
  }

  function populateModelDropdown() {
    selectGroqModel.innerHTML = "";
    const current = groqService.getModel();
    const models = groqService.availableModels || ["openai/gpt-oss-120b", "qwen/qwen3.6-27b", "openai/gpt-oss-20b"];

    models.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      if (m === current) opt.selected = true;
      selectGroqModel.appendChild(opt);
    });
  }

  function refreshMemberViews() {
    members = getMembers();
    filterLobbyMembers();
  }

  function showTypingIndicator(show) {
    if (show) {
      typingLabelEl.textContent = `${activeMember.nickname || activeMember.name} sedang mengetik...`;
      typingIndicatorEl.classList.add("active");
    } else {
      typingIndicatorEl.classList.remove("active");
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
    }, 50);
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }).replace(".", ":");
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  init();
});

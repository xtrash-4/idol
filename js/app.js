/**
 * MPRUYY HALU - Core Application Logic
 * Mengatur interaksi UI, state member, pengiriman pesan via Groq API,
 * 24-Hour Instagram Story Player, efek suara, galeri PAP, dan manajemen chat storage.
 */

document.addEventListener("DOMContentLoaded", () => {
  // === AUTO-CLEANUP: Hapus model deprecated dari localStorage ===
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
    console.log(`[IDOLCHAT] Model "${savedModel}" sudah deprecated, reset ke default.`);
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
  let activeMember = members[0] || {}; // Default idol
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
  const btnOpenProfileDrawer = document.getElementById("btn-open-profile-drawer");

  // Modals & Drawers
  const modalSettings = document.getElementById("modal-settings");
  const btnOpenSettings = document.getElementById("btn-open-settings");
  const btnCloseSettings = document.getElementById("btn-close-settings");
  const btnSaveSettings = document.getElementById("btn-save-settings");
  const btnRemoveApiKey = document.getElementById("btn-remove-api-key");
  const inputGroqKey = document.getElementById("input-groq-key");
  const selectGroqModel = document.getElementById("select-groq-model");

  const modalAddMember = document.getElementById("modal-add-member");
  const btnOpenAddMember = document.getElementById("btn-open-add-member");
  const btnCloseAddMember = document.getElementById("btn-close-add-member");
  const btnCancelAddMember = document.getElementById("btn-cancel-add-member");
  const btnSaveCustomMember = document.getElementById("btn-save-custom-member");

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
  const toastEl = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");

  // Story Player Elements
  const storyPlayerModal = document.getElementById("story-player-modal");
  const storyPlayerBackdrop = document.getElementById("story-player-backdrop");
  const storyProgressContainer = document.getElementById("story-progress-container");
  const storyAuthorAvatar = document.getElementById("story-author-avatar");
  const storyAuthorName = document.getElementById("story-author-name");
  const storyTimestamp = document.getElementById("story-timestamp");
  const btnStoryClose = document.getElementById("btn-story-close");
  const storyMainImage = document.getElementById("story-main-image");
  const storyTapPrev = document.getElementById("story-tap-prev");
  const storyTapNext = document.getElementById("story-tap-next");
  const storyLocationText = document.getElementById("story-location-text");
  const storyMusicText = document.getElementById("story-music-text");
  const storyTimeBadge = document.getElementById("story-sticker-time");
  const storyCaptionText = document.getElementById("story-caption-text");
  const storyReplyInput = document.getElementById("story-reply-input");
  const btnStorySendReply = document.getElementById("btn-story-send-reply");

  // State Filter Lobby
  let activeGroup = "JKT48"; // Default grup: JKT48
  let activeSubFilter = "all";
  let activeSearchQuery = "";

  const groupSwitcherTabs = document.getElementById("group-switcher-tabs");

  // Story Player State
  let currentStoryMember = null;
  let currentStorySlideIndex = 0;
  let currentStorySlides = [];
  let storyTimer = null;
  const STORY_DURATION = 5000; // 5s per slide

  // Services
  const groqService = new GroqService();
  const sounds = (typeof SoundEngine !== 'undefined') ? new SoundEngine() : { playClick:()=>{}, playSend:()=>{}, playReceive:()=>{}, toggle:()=>true };

  function init() {
    updateUserProfileDisplay();
    renderGroupFilterPills();
    renderLobbyGrid();
    setupEventListeners();

    // Default: Tampilkan Lobby Screen
    showLobby();
  }

  // ==========================================================================
  // VIEW SWITCHING (LOBBY <-> CHAT)
  // ==========================================================================

  function showLobby() {
    if (lobbyView && chatLayout) {
      chatLayout.classList.add("hidden");
      lobbyView.classList.remove("hidden");
      renderGroupFilterPills();
      renderLobbyGrid(activeSearchQuery);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function showChat(member) {
    if (lobbyView && chatLayout) {
      lobbyView.classList.add("hidden");
      chatLayout.classList.remove("hidden");
      selectMember(member || activeMember);
    }
  }

  // ==========================================================================
  // RENDER FUNCTIONS (LOBBY SELECTION & GROUP SEPARATION)
  // ==========================================================================

  function renderGroupFilterPills() {
    if (!lobbyFilterPills) return;
    lobbyFilterPills.innerHTML = "";

    let pills = [];
    if (activeGroup === "JKT48") {
      pills = [
        { label: "Semua JKT48", val: "all" },
        { label: "Gen 7", val: "Gen 7" },
        { label: "Gen 11", val: "Gen 11" },
        { label: "Gen 3", val: "Gen 3" },
        { label: "Gen 10", val: "Gen 10" },
        { label: "Gen 6", val: "Gen 6" },
        { label: "Gen 9", val: "Gen 9" }
      ];
    } else {
      pills = [
        { label: "Semua NewJeans", val: "all" },
        { label: "Minji (Leader)", val: "minji" },
        { label: "Hanni", val: "hanni" },
        { label: "Danielle", val: "danielle" },
        { label: "Haerin", val: "haerin" },
        { label: "Hyein (Maknae)", val: "hyein" }
      ];
    }

    pills.forEach(p => {
      const btn = document.createElement("button");
      btn.className = `filter-pill ${p.val === activeSubFilter ? "active" : ""}`;
      btn.dataset.sub = p.val;
      btn.textContent = p.label;
      btn.type = "button";
      btn.addEventListener("click", () => {
        sounds.playClick();
        activeSubFilter = p.val;
        document.querySelectorAll(".filter-pill").forEach(el => el.classList.remove("active"));
        btn.classList.add("active");
        renderLobbyGrid(activeSearchQuery);
      });
      lobbyFilterPills.appendChild(btn);
    });
  }

  function renderLobbyGrid(query = "") {
    if (!lobbyGrid) return;
    lobbyGrid.innerHTML = "";

    const q = query.toLowerCase().trim();
    const filtered = members.filter(m => {
      const isNewJeans = (m.group === "NewJeans") || m.generation?.includes("NewJeans");
      if (activeGroup === "JKT48" && isNewJeans) return false;
      if (activeGroup === "NewJeans" && !isNewJeans) return false;

      if (activeSubFilter !== "all") {
        if (activeGroup === "JKT48") {
          if (!m.generation.includes(activeSubFilter)) return false;
        } else if (activeGroup === "NewJeans") {
          if (m.id !== activeSubFilter) return false;
        }
      }

      if (q) {
        const matchQuery = 
          m.name.toLowerCase().includes(q) || 
          m.nickname.toLowerCase().includes(q) ||
          m.generation.toLowerCase().includes(q) ||
          (m.tags && m.tags.some(t => t.toLowerCase().includes(q)));
        if (!matchQuery) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      lobbyGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <i class="fa-solid fa-user-slash" style="font-size: 32px; margin-bottom: 12px; color: var(--text-faint);"></i>
          <p>Tidak ada member ${activeGroup} yang cocok dengan pencarian "<strong>${escapeHtml(query)}</strong>"</p>
        </div>
      `;
      return;
    }

    filtered.forEach(member => {
      const card = document.createElement("div");
      card.className = "lobby-card";
      
      const groupName = member.group || (member.generation.includes("NewJeans") ? "NewJeans" : "JKT48");
      
      const tagsHtml = (member.tags || ["Idol"])
        .slice(0, 3)
        .map(tag => `<span class="lobby-tag">${escapeHtml(tag)}</span>`)
        .join("");

      card.innerHTML = `
        <div class="lobby-card-avatar-wrap story-ring-wrap" title="Klik avatar untuk melihat Story 24 Jam ${escapeHtml(member.nickname || member.name)}">
          <div class="story-ring-active">
            <img src="${member.avatar}" alt="${member.name}" class="lobby-card-avatar" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'">
          </div>
          <div class="lobby-card-online-dot" title="Online"></div>
        </div>
        <h3 class="lobby-card-name">${escapeHtml(member.name)}</h3>
        <div class="lobby-card-meta">
          <span class="lobby-card-group-tag ${groupName}">${groupName}</span>
          <span class="lobby-card-gen">${escapeHtml(member.generation.replace("Generasi ", "Gen "))}</span>
          <span class="lobby-card-fandom">${escapeHtml(member.fandom || "Fans")}</span>
        </div>
        <p class="lobby-card-jiko">"${escapeHtml(member.jikoshoukai)}"</p>
        <div class="lobby-card-tags">
          ${tagsHtml}
        </div>
        <button class="btn-lobby-chat-start" type="button">
          <i class="fa-regular fa-comment-dots"></i> Chat Sekarang
        </button>
      `;

      // Klik avatar untuk buka Instagram Story
      const avatarWrap = card.querySelector(".lobby-card-avatar-wrap");
      avatarWrap.addEventListener("click", (e) => {
        e.stopPropagation();
        sounds.playClick();
        openStory(member);
      });

      // Klik kartu / tombol chat untuk masuk ke room chat
      card.addEventListener("click", () => {
        sounds.playClick();
        showChat(member);
      });

      lobbyGrid.appendChild(card);
    });
  }

  function refreshMemberViews() {
    try {
      renderLobbyGrid(activeSearchQuery);
    } catch (error) {
      console.warn("Gagal memperbarui daftar idol:", error);
    }
  }

  function selectMember(member) {
    activeMember = member;

    // Update Header
    activeHeaderAvatar.src = member.avatar;
    activeHeaderName.innerHTML = `${escapeHtml(member.name)} <span class="member-badge" id="active-header-gen">${escapeHtml(member.generation)}</span>`;
    activeHeaderStatus.textContent = "Online";
    typingLabelEl.textContent = `${escapeHtml(member.nickname || member.name)} sedang mengetik...`;

    // Render Chat Messages for selected idol
    renderChatMessages();
  }

  function renderChatMessages() {
    chatMessagesEl.innerHTML = "";

    // Welcome Banner (Hanya Nama Member Bersih & Jikoshoukai)
    const banner = document.createElement("div");
    banner.className = "welcome-banner";
    banner.innerHTML = `
      <img src="${activeMember.avatar}" alt="${activeMember.name}" class="welcome-avatar">
      <div class="welcome-content">
        <h3>${escapeHtml(activeMember.name)}</h3>
        <p class="jikoshoukai-quote">"${escapeHtml(activeMember.jikoshoukai)}"</p>
        <span class="fandom-pill"><i class="fa-solid fa-star"></i> Fandom: ${escapeHtml(activeMember.fandom || 'Fans')}</span>
      </div>
    `;
    chatMessagesEl.appendChild(banner);

    // Date divider
    const dateDiv = document.createElement("div");
    dateDiv.className = "date-divider";
    dateDiv.innerHTML = `<span class="date-badge">Hari Ini</span>`;
    chatMessagesEl.appendChild(dateDiv);

    // Render Saved Messages
    const history = getMemberChatHistory(activeMember.id);

    if (history.length === 0) {
      const emptyStarter = document.createElement("div");
      emptyStarter.className = "chat-empty-starter";
      emptyStarter.id = "chat-empty-starter";
      emptyStarter.innerHTML = `
        <div class="empty-starter-icon"><i class="fa-regular fa-paper-plane"></i></div>
        <h4>Mulai Obrolan Pertama</h4>
        <p>Kirim sapaan atau obrolan santai ke <strong>${escapeHtml(activeMember.nickname || activeMember.name)}</strong> di bawah!</p>
      `;
      chatMessagesEl.appendChild(emptyStarter);
    } else {
      history.forEach(msg => {
        appendMessageToUI(msg);
      });
    }

    scrollToBottom();
  }

  function appendMessageToUI(msg) {
    const emptyStarter = document.getElementById("chat-empty-starter");
    if (emptyStarter) {
      emptyStarter.remove();
    }

    const isUser = msg.role === "user";
    const roleClass = isUser ? "user" : "idol";

    // Cek apakah pesan terakhir di DOM berasal dari pengirim yang SAMA
    const lastGroup = chatMessagesEl.querySelector(".message-group:last-of-type");
    let targetGroup = null;

    if (lastGroup && lastGroup.classList.contains(roleClass)) {
      targetGroup = lastGroup;
    } else {
      targetGroup = document.createElement("div");
      targetGroup.className = `message-group ${roleClass}`;

      const avatarHtml = isUser
        ? ``
        : `<img src="${activeMember.avatar}" alt="Avatar" class="group-avatar">`;

      const senderNameHtml = isUser
        ? ``
        : `<span class="group-sender-name">${escapeHtml(activeMember.nickname || activeMember.name)}</span>`;

      targetGroup.innerHTML = `
        ${avatarHtml}
        <div class="group-content">
          ${senderNameHtml}
          <div class="group-bubbles"></div>
          <span class="group-time">${msg.time || getCurrentTime()}</span>
        </div>
      `;
      chatMessagesEl.appendChild(targetGroup);
    }

    const bubblesContainer = targetGroup.querySelector(".group-bubbles");
    const timeEl = targetGroup.querySelector(".group-time");
    if (timeEl) timeEl.textContent = msg.time || getCurrentTime();

    // 1. Render PAP jika ada
    if (msg.pap) {
      const papCard = document.createElement("div");
      papCard.className = "pap-card";
      papCard.onclick = () => openLightbox(msg.pap.url, msg.pap.caption || '');
      papCard.innerHTML = `
        <div class="pap-badge"><i class="fa-solid fa-camera"></i> Idol PAP</div>
        <img src="${msg.pap.url}" alt="${escapeHtml(msg.pap.caption || 'Idol PAP')}" loading="lazy">
      `;
      bubblesContainer.appendChild(papCard);
    }

    // 2. Render Bubble Teks jika ada
    if (msg.content && msg.content.trim()) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.innerHTML = escapeHtml(msg.content);
      bubblesContainer.appendChild(bubble);
    }
  }

  // ==========================================================================
  // SMART VARIED PAP POOL (100% Bervariasi & Anti-Monoton / No Repeat)
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

    try {
      let reply = "";
      let attachedPap = null;

      // Cek apakah user meminta PAP secara eksplisit
      const isAskingPap = /pap|foto|selfie|liat muka|lihat muka|minta foto|kirim foto|fotoin|coba foto/i.test(text);

      if (isAskingPap) {
        attachedPap = getVariedPap(activeMember);
      }

      // Check if API Key exists
      if (groqService.hasApiKey()) {
        const history = getMemberChatHistory(activeMember.id);
        reply = await groqService.sendChat(activeMember, history, text, userName, attachedPap);
      } else {
        // Fallback natural dialogue engine if API key is not yet set
        await new Promise(r => setTimeout(r, 1100));
        reply = getFallbackDemoReply(activeMember, text, attachedPap);
      }

      // Periksa apakah balasan AI mengandung tag [PAP]
      if (reply.includes("[PAP]")) {
        reply = reply.replace(/\[PAP\]/gi, "").trim();
        if (!attachedPap && isAskingPap) {
          attachedPap = getVariedPap(activeMember);
        }
      }

      // Bersihkan dan pecah balasan menjadi Multi-Message Burst
      let bubbles = reply
        .split("|||")
        .map(s => s.trim())
        .filter(Boolean);

      if (bubbles.length === 0) {
        bubbles = [reply.trim() || "iyaa kak hehe"];
      }

      // Render Multi-Message Burst secara bertahap seperti manusia asli
      for (let i = 0; i < bubbles.length; i++) {
        const bubbleText = bubbles[i];
        const isLast = i === bubbles.length - 1;
        const msgPap = isLast ? attachedPap : null;

        if (i > 0) {
          showTypingIndicator(true);
          const typingDelay = Math.min(1500, Math.max(800, bubbleText.length * 35));
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
      console.warn("[CHAT ENGINE] Groq AI offline/fallback active:", err.message);
      // Fallback Natural Contextual Dialogue (Anti-Error, selalu merespon natural)
      try {
        const fallbackReply = getFallbackDemoReply(activeMember, messageText, chosenPap);
        let fallbackBubbles = (fallbackReply || "haii! hehe iyaa kakk").split("|||").map(b => b.trim()).filter(Boolean);
        fallbackBubbles = applyNaturalTypo(fallbackBubbles);
        
        for (let i = 0; i < fallbackBubbles.length; i++) {
          const bubbleText = fallbackBubbles[i];
          const isLast = i === fallbackBubbles.length - 1;
          const msgPap = isLast ? chosenPap : null;

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
  // DEEP CONTEXTUAL INTENT-MATCHING DIALOGUE ENGINE (Anti-Template & Natural)
  // ==========================================================================

    // ==========================================================================
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
  }

  // ==========================================================================
  // INSTAGRAM / WEVERSE 24-HOUR STORY PLAYER ENGINE (Rich 4-Slide Media)
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

    // Acak foto PAP dari koleksi member agar story selalu bervariasi dan tidak itu-itu saja
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
    storyTimeBadge.textContent = slide.time;
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
    } else {
      renderStorySlide(0);
    }
  }

  function closeStory() {
    if (storyTimer) clearTimeout(storyTimer);
    storyPlayerModal.classList.remove("active");
  }

  function sendStoryReply(replyText) {
    if (!replyText || !replyText.trim() || !currentStoryMember) return;
    const textToSend = `[Membalas Story: "${currentStorySlides[currentStorySlideIndex]?.caption}"] ${replyText.trim()}`;
    const targetMember = currentStoryMember;
    closeStory();
    showChat(targetMember);
    handleSendMessage(textToSend);
  }

  // ==========================================================================
  // STORAGE & HISTORY
  // ==========================================================================

  function getMemberChatHistory(memberId) {
    const key = `idolchat_history_${memberId}`;
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  }

  function saveMessageToHistory(memberId, msgObj) {
    const key = `idolchat_history_${memberId}`;
    const history = getMemberChatHistory(memberId);
    history.push(msgObj);
    const trimmed = history.slice(-40);
    localStorage.setItem(key, JSON.stringify(trimmed));
  }

  function saveCustomMember(memberObj) {
    const custom = JSON.parse(localStorage.getItem("idolchat_custom_members") || "[]");
    custom.push(memberObj);
    localStorage.setItem("idolchat_custom_members", JSON.stringify(custom));
  }

  // ==========================================================================
  // DRAWER & LIGHTBOX
  // ==========================================================================

  function openProfileDrawer() {
    drawerAvatar.src = activeMember.avatar;
    drawerName.textContent = activeMember.name;
    drawerGen.textContent = activeMember.generation;
    drawerJiko.textContent = `"${activeMember.jikoshoukai}"`;

    const tags = activeMember.tags || [];
    drawerTags.innerHTML = tags.map(t => `<span class="drawer-tag">${escapeHtml(t)}</span>`).join("");

    const paps = activeMember.paps || [];
    drawerGallery.innerHTML = "";
    if (paps.length === 0) {
      drawerGallery.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-faint); font-size: 12px; padding: 20px;">Belum ada koleksi foto.</p>`;
    } else {
      paps.forEach(p => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        item.innerHTML = `<img src="${p.url}" alt="${escapeHtml(p.caption || '')}" loading="lazy">`;
        item.addEventListener("click", () => openLightbox(p.url, p.caption));
        drawerGallery.appendChild(item);
      });
    }

    profileDrawer.classList.add("active");
    profileDrawer.classList.add("open");
  }

  function closeProfileDrawer() {
    profileDrawer.classList.remove("active");
    profileDrawer.classList.remove("open");
  }

  function openLightbox(url, caption) {
    lightboxImg.src = url;
    lightboxCaption.textContent = caption || "";
    lightboxModal.classList.add("active");
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
  }

  // ==========================================================================
  // EVENT LISTENERS SETUP
  // ==========================================================================

  function setupEventListeners() {
    // 1. Group Switcher Tabs (JKT48 vs NewJeans)
    if (groupSwitcherTabs) {
      const tabBtns = groupSwitcherTabs.querySelectorAll(".group-tab-btn");
      tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          sounds.playClick();
          tabBtns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          activeGroup = btn.dataset.group;
          activeSubFilter = "all";
          renderGroupFilterPills();
          renderLobbyGrid(activeSearchQuery);
        });
      });
    }

    // 2. Search Input
    if (lobbySearchInput) {
      lobbySearchInput.addEventListener("input", (e) => {
        activeSearchQuery = e.target.value;
        renderLobbyGrid(activeSearchQuery);
      });
    }

    // 3. Navigation Header Back to Lobby
    if (btnHeaderBackLobby) {
      btnHeaderBackLobby.addEventListener("click", () => {
        sounds.playClick();
        showLobby();
      });
    }

    // 4. Click Chat Header Avatar to Open 24h Story
    if (activeHeaderAvatar) {
      activeHeaderAvatar.parentElement.addEventListener("click", () => {
        sounds.playClick();
        openStory(activeMember);
      });
    }

    // 5. Send Chat Form
    chatFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSendMessage();
    });

        // Focus scroll for mobile keyboard
    chatInputEl.addEventListener("focus", () => {
      setTimeout(() => {
        scrollToBottom();
        chatInputEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 250);
    });

    chatInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });

    chatInputEl.addEventListener("input", () => {
      chatInputEl.style.height = "auto";
      chatInputEl.style.height = Math.min(chatInputEl.scrollHeight, 120) + "px";
    });

    // Quick Prompts Chips (Support both .quick-chip and .prompt-chip)
    const quickChips = document.querySelectorAll(".quick-chip, .prompt-chip");
    quickChips.forEach(chip => {
      chip.addEventListener("click", () => {
        sounds.playClick();
        const text = chip.dataset.prompt || chip.dataset.text || chip.textContent.trim();
        handleSendMessage(text);
      });
    });

    // Request PAP Buttons
    if (btnRequestPap) {
      btnRequestPap.addEventListener("click", () => {
        sounds.playClick();
        handleSendMessage("minta pap foto kamu dong");
      });
    }
    if (btnAttachPap) {
      btnAttachPap.addEventListener("click", () => {
        sounds.playClick();
        handleSendMessage("pap foto kamu yang paling gemes dong");
      });
    }

    // Reset Chat Buttons (Header & Drawer)
    const resetChatBtns = [
      document.getElementById("btn-reset-chat"),
      document.getElementById("btn-header-reset-chat"),
      document.getElementById("btn-clear-current-chat")
    ].filter(Boolean);

    resetChatBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        sounds.playClick();
        if (confirm(`Hapus seluruh riwayat chat dengan ${activeMember.name}?`)) {
          localStorage.removeItem(`idolchat_history_${activeMember.id}`);
          renderChatMessages();
          closeProfileDrawer();
          showToast("Riwayat chat berhasil dibersihkan.");
        }
      });
    });

    // Profile Drawer
    if (btnOpenProfileDrawer) {
      btnOpenProfileDrawer.addEventListener("click", () => {
        sounds.playClick();
        openProfileDrawer();
      });
    }
    if (btnCloseDrawer) {
      btnCloseDrawer.addEventListener("click", () => {
        sounds.playClick();
        closeProfileDrawer();
      });
    }

    // Story Player Navigation Listeners
    if (btnStoryClose) btnStoryClose.addEventListener("click", closeStory);
    if (storyPlayerBackdrop) storyPlayerBackdrop.addEventListener("click", closeStory);
    if (storyTapPrev) storyTapPrev.addEventListener("click", prevStorySlide);
    if (storyTapNext) storyTapNext.addEventListener("click", nextStorySlide);

    if (btnStorySendReply) {
      btnStorySendReply.addEventListener("click", () => {
        sendStoryReply(storyReplyInput.value);
      });
    }
    if (storyReplyInput) {
      storyReplyInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          sendStoryReply(storyReplyInput.value);
        }
      });
    }

    // Quick Emoji Reactions in Story
    const emojiBtns = document.querySelectorAll(".btn-story-emoji");
    emojiBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const emoji = btn.dataset.emoji || btn.textContent.trim();
        sendStoryReply(emoji);
      });
    });

    // Sound Toggle
    if (btnLobbySound) {
      btnLobbySound.addEventListener("click", () => {
        const isEnabled = sounds.toggle();
        btnLobbySound.innerHTML = isEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
        showToast(isEnabled ? "🔊 Efek suara diaktifkan" : "🔇 Efek suara dibisukan");
      });
    }

    if (btnSoundToggle) {
      btnSoundToggle.addEventListener("click", () => {
        const isEnabled = sounds.toggle();
        btnSoundToggle.innerHTML = isEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
        showToast(isEnabled ? "🔊 Efek suara diaktifkan" : "🔇 Efek suara dibisukan");
      });
    }

    // Settings Modal
    if (btnOpenSettings) btnOpenSettings.addEventListener("click", openSettingsModal);
    if (btnLobbySettings) btnLobbySettings.addEventListener("click", openSettingsModal);
    const btnHeaderSettings = document.getElementById("btn-header-settings");
    if (btnHeaderSettings) {
      btnHeaderSettings.addEventListener("click", openSettingsModal);
    }
    if (btnCloseSettings) btnCloseSettings.addEventListener("click", closeSettingsModal);

    // Test API Key Button
    const btnTestApiKey = document.getElementById("btn-test-api-key");
    if (btnTestApiKey) {
      btnTestApiKey.addEventListener("click", async () => {
        const key = inputGroqKey.value.trim();
        const model = selectGroqModel.value;
        if (!key) {
          alert("Silakan masukkan API Key Groq terlebih dahulu!");
          return;
        }
        btnTestApiKey.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mendeteksi Model...';
        try {
          const result = await groqService.testConnection(key, model);
          btnTestApiKey.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i> Terhubung!';
          
          populateModelSelect(result.availableModels, result.activeModel);

          showToast(`🎉 Terhubung ke model: ${result.activeModel}`);
          setTimeout(() => {
            btnTestApiKey.innerHTML = '<i class="fa-solid fa-bolt"></i> Tes Koneksi';
          }, 3000);
        } catch (err) {
          btnTestApiKey.innerHTML = '<i class="fa-solid fa-xmark" style="color:#ef4444;"></i> Gagal';
          alert(`❌ Gagal terhubung ke Groq API!\n\nDetail: ${err.message}`);
          setTimeout(() => {
            btnTestApiKey.innerHTML = '<i class="fa-solid fa-bolt"></i> Tes Koneksi';
          }, 3000);
        }
      });
    }
    btnSaveSettings.addEventListener("click", () => {
      const key = inputGroqKey.value.trim();
      const model = selectGroqModel.value;
      if (key && key.length < 10) {
        alert("API Key terlalu pendek. Pastikan Anda menyalin kuncinya dengan lengkap.");
        return;
      }
      groqService.setApiKey(key);
      groqService.setModel(model);
      closeSettingsModal();
      showToast("✅ Pengaturan API berhasil disimpan!");
    });
    btnRemoveApiKey.addEventListener("click", () => {
      groqService.setApiKey("");
      inputGroqKey.value = "";
      closeSettingsModal();
      showToast("API Key berhasil dihapus.");
    });

    // Add Custom Member Modal
    btnOpenAddMember.addEventListener("click", () => {
      modalAddMember.classList.add("active");
    });
    btnCloseAddMember.addEventListener("click", () => modalAddMember.classList.remove("active"));
    btnCancelAddMember.addEventListener("click", () => modalAddMember.classList.remove("active"));
    btnSaveCustomMember.addEventListener("click", handleSaveCustomMember);

    // Edit User Profile Modal
    if (btnLobbyUser) {
      btnLobbyUser.addEventListener("click", () => {
        inputUserName.value = userName;
        modalUserProfile.classList.add("active");
      });
    }
    btnCloseUserProfile.addEventListener("click", () => modalUserProfile.classList.remove("active"));
    btnSaveUserProfile.addEventListener("click", () => {
      const val = inputUserName.value.trim();
      if (val) {
        userName = val;
        localStorage.setItem("jkt48_user_name", userName);
        updateUserProfileDisplay();
        modalUserProfile.classList.remove("active");
        showToast(`Nama profil berhasil diubah menjadi: ${userName}`);
      }
    });

    // Lightbox Modal
    lightboxModal.addEventListener("click", closeLightbox);
  }

  // ==========================================================================
  // CUSTOM MEMBER HANDLER
  // ==========================================================================

  function handleSaveCustomMember() {
    const name = document.getElementById("custom-name").value.trim();
    const nickname = document.getElementById("custom-nickname").value.trim();
    const gen = document.getElementById("custom-gen").value.trim();
    const avatar = document.getElementById("custom-avatar").value.trim();
    const jiko = document.getElementById("custom-jiko").value.trim();
    const persona = document.getElementById("custom-persona").value.trim();

    if (!name || !nickname || !jiko || !persona) {
      alert("Mohon lengkapi semua data member!");
      return;
    }

    const newMember = {
      id: "custom_" + Date.now(),
      name: name,
      nickname: nickname,
      generation: gen || "Member JKT48",
      color: "#e11d48",
      avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      status: `Online • ${nickname} ✨`,
      statusBio: `Halo aku ${nickname} JKT48! Senang kenalan denganmu 💖`,
      jikoshoukai: jiko,
      fandom: `${nickname} Lovers`,
      tags: ["Custom Oshi", "JKT48", gen],
      paps: [
        {
          url: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600",
          caption: `Selfie perdana dari ${nickname} buat kamu! 🤍✨`
        }
      ],
      personaPrompt: `Kamu adalah ${name} (${nickname}), member ${gen} dari JKT48.
Karakteristik & Gaya:
${persona}

Aturan Ketikan:
- Chat santai kasual khas WhatsApp tanpa tanda titik kaku di setiap kalimat.
- Tanpa format tebal (**), tanpa simbol berlebihan, maksimal 0-1 emoji.
- Selalu nyambung dengan pesan terakhir yang dikirim fans.`
    };

    saveCustomMember(newMember);
    members = getMembers();
    refreshMemberViews();
    selectMember(newMember);

    modalAddMember.classList.remove("active");
    document.getElementById("custom-member-form").reset();
    showToast(`🎉 Berhasil menambahkan ${name} ke daftar Oshi!`);
  }

  // ==========================================================================
  // UTILITIES
  // ==========================================================================

  function populateModelSelect(models, selectedModel) {
    if (!Array.isArray(models) || models.length === 0) return;
    selectGroqModel.innerHTML = "";
    models.forEach(model => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model + (model === selectedModel ? " (Aktif)" : "");
      option.selected = model === selectedModel;
      selectGroqModel.appendChild(option);
    });
  }

  async function openSettingsModal() {
    inputGroqKey.value = groqService.getApiKey();
    const selectedModel = groqService.getModel();
    populateModelSelect(groqService.availableModels, selectedModel);
    modalSettings.classList.add("active");

    if (groqService.hasApiKey()) {
      try {
        const models = await groqService.fetchModels(undefined, true);
        const activeModel = models.includes(selectedModel) ? selectedModel : models[0];
        populateModelSelect(models, activeModel);
      } catch (error) {
        console.warn("Tidak dapat memperbarui daftar model:", error);
      }
    }
  }

  function closeSettingsModal() {
    modalSettings.classList.remove("active");
  }

  function updateUserProfileDisplay() {
    if (lobbyUserName) {
      lobbyUserName.textContent = userName;
    }
  }

  function showTypingIndicator(show) {
    typingIndicatorEl.classList.toggle("active", show);
    if (show) scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(() => {
      chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
    }, 50);
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  }

  function showToast(message) {
    toastMsg.textContent = message;
    toastEl.classList.add("show");
    setTimeout(() => {
      toastEl.classList.remove("show");
    }, 4000);
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

  // Start the App
  init();
});

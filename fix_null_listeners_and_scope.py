import os
import re

APP_PY_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\update_app_with_stories_and_avatar.py"

with open(APP_PY_PATH, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Fix handleSendMessage scopes
old_handle = '''  async function handleSendMessage(customText = null) {
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
    let attachedVn = null;

    // Cek apakah user meminta PAP atau VN secara eksplisit
    const isAskingPap = /pap|foto|selfie|liat muka|lihat muka|minta foto|kirim foto|fotoin|coba foto/i.test(text);
    const isAskingVn = /vn|voice note|suara|rekaman|denger suara|ngomong dong|pesan suara/i.test(text);

    if (isAskingPap) {
      attachedPap = getVariedPap(activeMember);
    }
    if (isAskingVn) {
      attachedVn = getVariedVoiceNote(activeMember, text);
    }

    try {
      let reply = "";

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

        const msgAudio = isLast ? attachedVn : null;
        const idolMsgObj = {
          role: "assistant",
          content: bubbleText,
          time: getCurrentTime(),
          pap: msgPap,
          audio: msgAudio
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
        const fallbackReply = getFallbackDemoReply(activeMember, text, attachedPap);
        let fallbackBubbles = (fallbackReply || "haii! hehe iyaa kakk").split("|||").map(b => b.trim()).filter(Boolean);
        fallbackBubbles = applyNaturalTypo(fallbackBubbles);
        
        for (let i = 0; i < fallbackBubbles.length; i++) {
          const bubbleText = fallbackBubbles[i];
          const isLast = i === fallbackBubbles.length - 1;
          const msgPap = isLast ? attachedPap : null;

          if (i > 0) {
            showTypingIndicator(true);
            await new Promise(r => setTimeout(r, 600));
          }
          showTypingIndicator(false);

          const msgAudio = isLast ? attachedVn : null;
          const idolMsgObj = {
            role: "assistant",
            content: bubbleText,
            time: getCurrentTime(),
            pap: msgPap,
            audio: msgAudio
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
  }'''

# Replace from async function handleSendMessage down to isSending = false; \n }
code = re.sub(
    r'async function handleSendMessage\(customText = null\) \{[\s\S]*?isSending = false;\s*\}\s*\}',
    old_handle,
    code
)

# 2. Add null checks around modal event listeners
modal_listeners_clean = '''    // Add Custom Member Modal (Safe null checks)
    if (btnOpenAddMember) btnOpenAddMember.addEventListener("click", () => {
      resetAddMemberForm();
      if (modalAddMember) modalAddMember.classList.add("active");
    });
    if (btnCloseAddMember && modalAddMember) btnCloseAddMember.addEventListener("click", () => modalAddMember.classList.remove("active"));
    if (btnCancelAddMember && modalAddMember) btnCancelAddMember.addEventListener("click", () => modalAddMember.classList.remove("active"));
    if (btnSaveCustomMember) btnSaveCustomMember.addEventListener("click", handleSaveCustomMember);

    // User Profile Modal (Safe null checks)
    if (btnOpenUserProfile && modalUserProfile) {
      btnOpenUserProfile.addEventListener("click", () => {
        if (inputUserName) inputUserName.value = userName;
        modalUserProfile.classList.add("active");
      });
    }
    if (btnCloseUserProfile && modalUserProfile) btnCloseUserProfile.addEventListener("click", () => modalUserProfile.classList.remove("active"));
    if (btnSaveUserProfile && modalUserProfile) {
      btnSaveUserProfile.addEventListener("click", () => {
        if (inputUserName) {
          const val = inputUserName.value.trim();
          if (val) {
            userName = val;
            localStorage.setItem("idolchat_user_name", userName);
            showToast(`Profil diperbarui: Halo kak ${userName}! 👋`);
          }
        }
        modalUserProfile.classList.remove("active");
      });
    }

    // Lightbox Modal
    if (lightboxModal) lightboxModal.addEventListener("click", closeLightbox);'''

code = re.sub(
    r'// Add Custom Member Modal[\s\S]*?lightboxModal\.addEventListener\("click", closeLightbox\);',
    modal_listeners_clean,
    code
)

with open(APP_PY_PATH, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: update_app_with_stories_and_avatar.py updated with robust scoping and null checks!")

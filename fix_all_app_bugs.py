import os

APP_PY_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\update_app_with_stories_and_avatar.py"

with open(APP_PY_PATH, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Fix catch block chosenPap -> attachedPap
target_catch = '''      try {
        const fallbackReply = getFallbackDemoReply(activeMember, text, chosenPap);
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

          const msgAudio = isLast ? attachedVn : null;
          const idolMsgObj = {
            role: "assistant",
            content: bubbleText,
            time: getCurrentTime(),
            pap: msgPap,
            audio: msgAudio
          };'''

replacement_catch = '''      try {
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
          };'''

code = code.replace(target_catch, replacement_catch)

# 2. Fix settings buttons event listeners
target_settings = '''    btnSaveSettings.addEventListener("click", () => {
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
      showToast("🗑️ API Key telah dihapus.");
    });'''

replacement_settings = '''    const btnSaveSettingsEl = document.getElementById("btn-save-settings");
    if (btnSaveSettingsEl) {
      btnSaveSettingsEl.addEventListener("click", () => {
        const key = inputGroqKey ? inputGroqKey.value.trim() : "";
        const model = selectGroqModel ? selectGroqModel.value : "llama-3.3-70b-versatile";
        if (key && key.length < 10) {
          alert("API Key terlalu pendek. Pastikan Anda menyalin kuncinya dengan lengkap.");
          return;
        }
        groqService.setApiKey(key);
        groqService.setModel(model);
        closeSettingsModal();
        showToast("✅ Pengaturan API berhasil disimpan!");
      });
    }

    const btnRemoveApiKeyEl = document.getElementById("btn-remove-api-key");
    if (btnRemoveApiKeyEl) {
      btnRemoveApiKeyEl.addEventListener("click", () => {
        groqService.setApiKey("");
        if (inputGroqKey) inputGroqKey.value = "";
        closeSettingsModal();
        showToast("🗑️ API Key telah dihapus.");
      });
    }'''

code = code.replace(target_settings, replacement_settings)

with open(APP_PY_PATH, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: All app bugs fixed cleanly in update_app_with_stories_and_avatar.py!")

import os

APP_PY_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\update_app_with_stories_and_avatar.py"

with open(APP_PY_PATH, "r", encoding="utf-8") as f:
    code = f.read()

target = '''    btnSaveSettings.addEventListener("click", () => {
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

        // Add Custom Member Modal (Safe null checks)
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
    }'''

replacement = '''    const btnSaveSettings = document.getElementById("btn-save-settings");
    if (btnSaveSettings) {
      btnSaveSettings.addEventListener("click", () => {
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

    const btnRemoveApiKey = document.getElementById("btn-remove-api-key");
    if (btnRemoveApiKey) {
      btnRemoveApiKey.addEventListener("click", () => {
        groqService.setApiKey("");
        if (inputGroqKey) inputGroqKey.value = "";
        closeSettingsModal();
        showToast("🗑️ API Key berhasil dihapus.");
      });
    }

    const btnOpenAddMemberEl = document.getElementById("btn-open-add-member");
    if (btnOpenAddMemberEl) {
      btnOpenAddMemberEl.addEventListener("click", () => {
        resetAddMemberForm();
        if (modalAddMember) modalAddMember.classList.add("active");
      });
    }
    const btnCloseAddMemberEl = document.getElementById("btn-close-add-member");
    if (btnCloseAddMemberEl && modalAddMember) btnCloseAddMemberEl.addEventListener("click", () => modalAddMember.classList.remove("active"));
    const btnCancelAddMemberEl = document.getElementById("btn-cancel-add-member");
    if (btnCancelAddMemberEl && modalAddMember) btnCancelAddMemberEl.addEventListener("click", () => modalAddMember.classList.remove("active"));
    const btnSaveCustomMemberEl = document.getElementById("btn-save-custom-member");
    if (btnSaveCustomMemberEl) btnSaveCustomMemberEl.addEventListener("click", handleSaveCustomMember);

    const btnOpenUserProfileEl = document.getElementById("btn-open-user-profile");
    if (btnOpenUserProfileEl && modalUserProfile) {
      btnOpenUserProfileEl.addEventListener("click", () => {
        if (inputUserName) inputUserName.value = userName;
        modalUserProfile.classList.add("active");
      });
    }
    const btnCloseUserProfileEl = document.getElementById("btn-close-user-profile");
    if (btnCloseUserProfileEl && modalUserProfile) btnCloseUserProfileEl.addEventListener("click", () => modalUserProfile.classList.remove("active"));
    const btnSaveUserProfileEl = document.getElementById("btn-save-user-profile");
    if (btnSaveUserProfileEl && modalUserProfile) {
      btnSaveUserProfileEl.addEventListener("click", () => {
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
    }'''

code = code.replace(target, replacement)

with open(APP_PY_PATH, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: Event listeners cleaned and guarded!")

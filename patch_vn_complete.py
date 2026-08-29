import os

APP_PY_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\update_app_with_stories_and_avatar.py"

with open(APP_PY_PATH, "r", encoding="utf-8") as f:
    code = f.read()

target_try = '''    try {
      let reply = "";
      let attachedPap = null;

      // Cek apakah user meminta PAP secara eksplisit
      const isAskingPap = /pap|foto|selfie|liat muka|lihat muka|minta foto|kirim foto|fotoin|coba foto/i.test(text);

      if (isAskingPap) {
        attachedPap = getVariedPap(activeMember);
      }'''

replacement_try = '''    try {
      let reply = "";
      let attachedPap = null;

      // Cek apakah user meminta PAP atau VN secara eksplisit
      const isAskingPap = /pap|foto|selfie|liat muka|lihat muka|minta foto|kirim foto|fotoin|coba foto/i.test(text);
      const isAskingVn = /vn|voice note|suara|rekaman|denger suara|ngomong dong|pesan suara/i.test(text);

      if (isAskingPap) {
        attachedPap = getVariedPap(activeMember);
      }
      let attachedVn = isAskingVn ? getVariedVoiceNote(activeMember, text) : null;'''

code = code.replace(target_try, replacement_try)

# In try block loop:
target_loop_try = '''        const msgAudio = (isLast && chosenVn) ? chosenVn : null;'''
replacement_loop_try = '''        const msgAudio = isLast ? attachedVn : null;'''
code = code.replace(target_loop_try, replacement_loop_try)

# In catch block loop:
target_loop_catch = '''          const msgAudio = (isLast && chosenVn) ? chosenVn : null;'''
replacement_loop_catch = '''          const msgAudio = isLast ? attachedVn : null;'''
code = code.replace(target_loop_catch, replacement_loop_catch)

with open(APP_PY_PATH, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: patch_vn_complete.py applied cleanly!")

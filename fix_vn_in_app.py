import os

APP_PY_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\update_app_with_stories_and_avatar.py"

with open(APP_PY_PATH, "r", encoding="utf-8") as f:
    code = f.read()

target = '''          const idolMsgObj = {
            role: "assistant",
            content: bubbleText,
            time: getCurrentTime(),
            pap: msgPap
          };'''

replacement = '''          const msgAudio = (isLast && chosenVn) ? chosenVn : null;
          const idolMsgObj = {
            role: "assistant",
            content: bubbleText,
            time: getCurrentTime(),
            pap: msgPap,
            audio: msgAudio
          };'''

code = code.replace(target, replacement)

with open(APP_PY_PATH, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: Audio field added to fallback catch block!")

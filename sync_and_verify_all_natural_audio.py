import os
import shutil

BASE_DIR = r"c:\Users\Hype\Desktop\IDOLCHAT"
AUDIO_DIR = os.path.join(BASE_DIR, "audio", "voice_notes", "michie")
SAMPLE_PATH = os.path.join(BASE_DIR, "sampel suara michie.mp3")

if os.path.exists(SAMPLE_PATH):
    shutil.copy2(SAMPLE_PATH, os.path.join(AUDIO_DIR, "michie_vn_asli_1.mp3"))
    print("SUCCESS: Copied original master sample to michie_vn_asli_1.mp3")

print("\nCurrent audio files in audio/voice_notes/michie:")
for fn in os.listdir(AUDIO_DIR):
    fp = os.path.join(AUDIO_DIR, fn)
    print(f" - {fn} ({os.path.getsize(fp)} bytes)")

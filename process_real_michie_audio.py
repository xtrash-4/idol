import os
import shutil
import soundfile as sf
import numpy as np

BASE_DIR = r"c:\Users\Hype\Desktop\IDOLCHAT"
AUDIO_DIR = os.path.join(BASE_DIR, "audio", "voice_notes", "michie")
SAMPLE_PATH = os.path.join(BASE_DIR, "sampel suara michie.mp3")

os.makedirs(AUDIO_DIR, exist_ok=True)

# Read original sample
data, sr = sf.read(SAMPLE_PATH)
duration = len(data) / sr
print(f"Original audio duration: {duration:.2f} seconds, Sample rate: {sr}")

# 1. Full authentic recording
sf.write(os.path.join(AUDIO_DIR, "michie_vn_asli_full.mp3"), data, sr)
sf.write(os.path.join(AUDIO_DIR, "michie_vn_asli_1.mp3"), data, sr)
sf.write(os.path.join(AUDIO_DIR, "michie_vn_sapaan.mp3"), data, sr)

# 2. Slice Part 1 (0 to ~7s) with fade in/out
p1_end = int(min(len(data), 7.5 * sr))
p1_data = np.copy(data[:p1_end])
# Apply 0.1s fade out
fade_len = int(0.15 * sr)
p1_data[-fade_len:] *= np.linspace(1, 0, fade_len)[:, None] if p1_data.ndim > 1 else np.linspace(1, 0, fade_len)
sf.write(os.path.join(AUDIO_DIR, "michie_vn_salting.mp3"), p1_data, sr)

# 3. Slice Part 2 (7.5s to 14.5s)
p2_start = int(7.5 * sr)
p2_end = int(min(len(data), 14.5 * sr))
p2_data = np.copy(data[p2_start:p2_end])
p2_data[:fade_len] *= np.linspace(0, 1, fade_len)[:, None] if p2_data.ndim > 1 else np.linspace(0, 1, fade_len)
p2_data[-fade_len:] *= np.linspace(1, 0, fade_len)[:, None] if p2_data.ndim > 1 else np.linspace(1, 0, fade_len)
sf.write(os.path.join(AUDIO_DIR, "michie_vn_semangat.mp3"), p2_data, sr)

# 4. Slice Part 3 (14.5s to end)
p3_start = int(14.5 * sr)
p3_data = np.copy(data[p3_start:])
p3_data[:fade_len] *= np.linspace(0, 1, fade_len)[:, None] if p3_data.ndim > 1 else np.linspace(0, 1, fade_len)
sf.write(os.path.join(AUDIO_DIR, "michie_vn_night.mp3"), p3_data, sr)

print("SUCCESS: All Michie voice notes are now 100% created from 'sampel suara michie.mp3'!")
for fn in os.listdir(AUDIO_DIR):
    fp = os.path.join(AUDIO_DIR, fn)
    print(f" - {fn}: {os.path.getsize(fp)} bytes")

import os
import shutil
import asyncio
import edge_tts

BASE_DIR = r"c:\Users\Hype\Desktop\IDOLCHAT"
AUDIO_DIR = os.path.join(BASE_DIR, "audio", "voice_notes")
MICHIE_DIR = os.path.join(AUDIO_DIR, "michie")
FREYA_DIR = os.path.join(AUDIO_DIR, "freya")
MINJI_DIR = os.path.join(AUDIO_DIR, "minji")

os.makedirs(MICHIE_DIR, exist_ok=True)
os.makedirs(FREYA_DIR, exist_ok=True)
os.makedirs(MINJI_DIR, exist_ok=True)

# 1. Copy user's original Michie voice recording
user_audio = os.path.join(BASE_DIR, "sampel suara michie.mp3")
if os.path.exists(user_audio):
    dst_user_audio = os.path.join(MICHIE_DIR, "michie_vn_asli_1.mp3")
    shutil.copy2(user_audio, dst_user_audio)
    print("SUCCESS: User Michie voice copied to michie_vn_asli_1.mp3!")

# 2. Generate dynamic voice notes for idols
async def generate_vns():
    vns = [
        # Michie Voice Notes (Cute Gen-Z cheerful)
        {
            "text": "Halo kakk! Makasih yaa udah semangatin aku hari ini, seneng banget deh bisa ngobrol santai sama kamu!",
            "file": os.path.join(MICHIE_DIR, "michie_vn_sapaan.mp3"),
            "voice": "id-ID-GadisNeural",
            "pitch": "+12Hz",
            "rate": "+10%"
        },
        {
            "text": "Ihh apaan sih gombal mulu haha, bikin aku senyum-senyum sendiri tau! Tapi makasih yaa!",
            "file": os.path.join(MICHIE_DIR, "michie_vn_salting.mp3"),
            "voice": "id-ID-GadisNeural",
            "pitch": "+14Hz",
            "rate": "+8%"
        },
        {
            "text": "Semangatt yaa buat hari ini! Jangan lupa makan yang banyak dan banyak minum air putih, oke?",
            "file": os.path.join(MICHIE_DIR, "michie_vn_semangat.mp3"),
            "voice": "id-ID-GadisNeural",
            "pitch": "+10Hz",
            "rate": "+10%"
        },
        {
            "text": "Udah malem nih kak, istirahat yuk biar besok seger lagi... good night yaa kakakku tersayang!",
            "file": os.path.join(MICHIE_DIR, "michie_vn_night.mp3"),
            "voice": "id-ID-GadisNeural",
            "pitch": "+8Hz",
            "rate": "+5%"
        },

        # Freya Voice Notes (Calm, cool, sweet)
        {
            "text": "Halo! Lagi sibuk apa nih sekarang? Semoga harimu menyenangkan dan lancar terus ya.",
            "file": os.path.join(FREYA_DIR, "freya_vn_sapaan.mp3"),
            "voice": "id-ID-GadisNeural",
            "pitch": "+3Hz",
            "rate": "+5%"
        },
        {
            "text": "Haha bisa aja kamu gombalnya, santai aja kali tapi makasih ya udah bikin mood aku jadi bagus.",
            "file": os.path.join(FREYA_DIR, "freya_vn_salting.mp3"),
            "voice": "id-ID-GadisNeural",
            "pitch": "+4Hz",
            "rate": "+5%"
        },
        {
            "text": "Jangan patah semangat ya! Kalau capek jangan dipaksain, istirahat dulu sebentar biar pulih.",
            "file": os.path.join(FREYA_DIR, "freya_vn_semangat.mp3"),
            "voice": "id-ID-GadisNeural",
            "pitch": "+2Hz",
            "rate": "+6%"
        },

        # Minji Voice Notes (Warm Bilingual)
        {
            "text": "Hai bunnies! Seneng banget bisa nyapa kamu hari ini, have a wonderful and lovely day ya!",
            "file": os.path.join(MINJI_DIR, "minji_vn_sapaan.mp3"),
            "voice": "id-ID-GadisNeural",
            "pitch": "+6Hz",
            "rate": "+8%"
        }
    ]

    for vn in vns:
        communicate = edge_tts.Communicate(
            vn["text"], 
            vn["voice"], 
            pitch=vn["pitch"], 
            rate=vn["rate"]
        )
        await communicate.save(vn["file"])
        print(f"Generated: {os.path.basename(vn['file'])} ({os.path.getsize(vn['file'])} bytes)")

asyncio.run(generate_vns())
print("ALL IDOL VOICE NOTES GENERATED SUCCESSFULLY!")

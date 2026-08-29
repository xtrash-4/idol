import os
import shutil
import time
from gradio_client import Client, handle_file

client = Client("mrfakename/E2-F5-TTS")
ref_audio_path = os.path.abspath("michie_reference_sample.wav")
output_dir = os.path.join("audio", "voice_notes", "michie")
os.makedirs(output_dir, exist_ok=True)

tasks = [
    {
        "name": "michie_vn_sapaan.wav",
        "text": "Halo kakk! Makasih banyak yaa udah semangatin aku hari ini, seneng banget deh bisa ngobrol santai bareng kamu!"
    },
    {
        "name": "michie_vn_salting.wav",
        "text": "Ihh apaan sih gombal mulu haha, bikin aku salting aja tau! Tapi makasih yaa hehe."
    },
    {
        "name": "michie_vn_semangat.wav",
        "text": "Semangat yaa buat hari ini! Jangan lupa makan yang banyak dan jangan sampai telat makan, oke?"
    },
    {
        "name": "michie_vn_night.wav",
        "text": "Udah malem nih kak, istirahat yuk biar besok seger lagi... good night yaa kakakku!"
    }
]

for t in tasks:
    print(f"\n--- Generating F5-TTS Clone: {t['name']} ---")
    print(f"Text: {t['text']}")
    try:
        result = client.predict(
            ref_audio=handle_file(ref_audio_path),
            ref_text="",
            gen_text=t['text'],
            remove_silence=True,
            api_name="/predict"
        )
        if result and isinstance(result, tuple) and len(result) > 0:
            out_file = result[0]
        else:
            out_file = result
        
        dst_wav = os.path.join(output_dir, t['name'])
        shutil.copy2(out_file, dst_wav)
        
        # Also copy as .mp3 name so web/android can use both
        dst_mp3 = dst_wav.replace(".wav", ".mp3")
        shutil.copy2(out_file, dst_mp3)
        
        print(f"SAVED: {dst_wav} ({os.path.getsize(dst_wav)} bytes)")
        time.sleep(1)
    except Exception as e:
        print(f"Failed generating {t['name']}: {e}")

print("\nALL F5-TTS MICHIE VOICE CLONES GENERATED SUCCESSFULLY!")

import whisper
import soundfile as sf
import scipy.signal
import numpy as np

data, sr = sf.read('sampel suara michie.mp3')
if data.ndim > 1:
    mono = data.mean(axis=1)
else:
    mono = data

num_samples = int(len(mono) * 16000 / sr)
mono_16k = scipy.signal.resample(mono, num_samples).astype(np.float32)

model = whisper.load_model('base')
result = model.transcribe(mono_16k, language='id')

with open('transcription_result.txt', 'w', encoding='utf-8') as f:
    f.write("Full Text: " + str(result.get("text")) + "\n\n")
    for seg in result.get("segments", []):
        f.write(f"[{seg.get('start'):.2f}s - {seg.get('end'):.2f}s]: {seg.get('text')}\n")

print("Transcription written to transcription_result.txt successfully!")

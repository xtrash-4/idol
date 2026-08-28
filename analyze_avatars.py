import os
from PIL import Image

def analyze_member_photos():
    base_dir = "member_photos"
    members = ["freya", "michie", "gracia", "christy", "marsha", "muthe", "ella", "gita"]
    
    results = {}
    
    for m in members:
        dir_path = os.path.join(base_dir, m)
        if not os.path.exists(dir_path):
            continue
        
        photos = [f for f in os.listdir(dir_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        
        photo_stats = []
        for p in photos:
            fp = os.path.join(dir_path, p)
            try:
                with Image.open(fp) as img:
                    w, h = img.size
                    ratio = h / w if w > 0 else 0
                    file_size = os.path.getsize(fp)
                    
                    # Skor potret: rasio 1.0 - 1.6 (potret atau square), resolusi tinggi, ukuran file bagus
                    score = 0
                    if 0.9 <= ratio <= 1.8: # Portrait / square yang bagus untuk avatar
                        score += 30
                    if min(w, h) >= 600:
                        score += 30
                    if min(w, h) >= 1000:
                        score += 20
                    if file_size > 100000: # Bukan thumbnail buram
                        score += 20
                        
                    photo_stats.append({
                        "file": p,
                        "path": f"member_photos/{m}/{p}",
                        "width": w,
                        "height": h,
                        "ratio": round(ratio, 2),
                        "size_kb": round(file_size / 1024, 1),
                        "score": score
                    })
            except Exception as e:
                pass
                
        photo_stats.sort(key=lambda x: (x["score"], x["width"] * x["height"]), reverse=True)
        results[m] = photo_stats
        
    for m, stats in results.items():
        print(f"\n=================== {m.upper()} Top 5 Candidates ===================")
        for i, s in enumerate(stats[:5]):
            print(f"[{i+1}] {s['file']} | {s['width']}x{s['height']} | Ratio: {s['ratio']} | Size: {s['size_kb']}KB | Score: {s['score']}")

if __name__ == "__main__":
    analyze_member_photos()

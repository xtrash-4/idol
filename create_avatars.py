import os
from PIL import Image

BEST_AVATAR_SOURCES = {
    # ── JKT48 ─────────────────────────────────────────────────────────────
    "freya": {
        "file": "freya_fd7c5d1b.jpg",
        "crop_top_bias": 0.25
    },
    "michie": {
        "file": "michie_05a8d0df.jpg",
        "crop_top_bias": 0.22
    },
    "gracia": {
        "file": "gracia_1fa917ce.jpg",
        "crop_top_bias": 0.20
    },
    "christy": {
        "file": "christy_2d191207.jpg",
        "crop_top_bias": 0.20
    },
    "marsha": {
        "file": "marsha_51f7cecb.jpg",
        "crop_top_bias": 0.20
    },
    "muthe": {
        "file": "muthe_5b8598bb.jpg",
        "crop_top_bias": 0.20
    },
    "ella": {
        "file": "ella_cfdcff55.jpg",
        "crop_top_bias": 0.22
    },
    "gita": {
        "file": "gita_d8750e93.jpg",
        "crop_top_bias": 0.20
    },
    # ── NewJeans ──────────────────────────────────────────────────────────
    "minji": {
        "file": "minji_b82bc7ca.jpg",
        "crop_top_bias": 0.20
    },
    "hanni": {
        "file": "hanni_8cfc7e7b.jpg",
        "crop_top_bias": 0.20
    },
    "danielle": {
        "file": "danielle_a821bb1c.jpg",
        "crop_top_bias": 0.20
    },
    "haerin": {
        "file": "haerin_8b6147d7.jpg",
        "crop_top_bias": 0.22
    },
    "hyein": {
        "file": "hyein_70ece6d8.png",
        "crop_top_bias": 0.20
    }
}

def make_clean_avatar(member, info):
    dir_path = os.path.join("member_photos", member)
    if not os.path.exists(dir_path):
        print(f"Directory not found: {dir_path}")
        return

    src_file = os.path.join(dir_path, info.get("file", ""))
    
    if not os.path.exists(src_file):
        files = [f for f in os.listdir(dir_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) and f != 'avatar.jpg']
        if not files:
            print(f"No photos for {member}")
            return
        # Ambil file terbesar
        files.sort(key=lambda x: os.path.getsize(os.path.join(dir_path, x)), reverse=True)
        src_file = os.path.join(dir_path, files[0])
        print(f"Fallback to {files[0]} for {member}")

    try:
        with Image.open(src_file) as img:
            img = img.convert("RGB")
            w, h = img.size
            
            sq_size = min(w, h)
            bias = info.get("crop_top_bias", 0.20)
            
            if h > w:
                top = int(h * bias)
                if top + sq_size > h:
                    top = h - sq_size
                left = 0
                right = w
                bottom = top + sq_size
            elif w > h:
                left = int((w - sq_size) / 2)
                right = left + sq_size
                top = 0
                bottom = h
            else:
                left, top, right, bottom = 0, 0, w, h
                
            cropped = img.crop((left, top, right, bottom))
            avatar_hd = cropped.resize((600, 600), Image.Resampling.LANCZOS)
            
            out_path = os.path.join(dir_path, "avatar.jpg")
            avatar_hd.save(out_path, "JPEG", quality=95)
            print(f"Generated clean avatar for {member}: {out_path} (600x600)")
    except Exception as e:
        print(f"Error creating avatar for {member}: {e}")

if __name__ == "__main__":
    for m, info in BEST_AVATAR_SOURCES.items():
        make_clean_avatar(m, info)

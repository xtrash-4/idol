import os
import cv2
import json
from PIL import Image

detector = cv2.FaceDetectorYN.create('yunet.onnx', '', (320, 320), score_threshold=0.55)

base_dir = "member_photos"
members_order = ['freya', 'michie', 'christy', 'gracia', 'ella', 'gita', 'marsha', 'muthe', 'minji', 'hanni', 'danielle', 'haerin', 'hyein']

print("=" * 60)
print("GENERATING PERFECT FACE AVATARS & CLEAN PAP LIST VIA AI FACE DETECTOR")
print("=" * 60)

member_clean_paps = {}

for m in members_order:
    m_dir = os.path.join(base_dir, m)
    if not os.path.exists(m_dir):
        continue

    photos = [f for f in os.listdir(m_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) and f != 'avatar.jpg']
    scored = []
    
    for f in photos:
        f_path = os.path.join(m_dir, f)
        img = cv2.imread(f_path)
        if img is None:
            continue
            
        h, w, _ = img.shape
        detector.setInputSize((w, h))
        _, faces = detector.detect(img)
        
        if faces is not None and len(faces) > 0:
            # Largest face with high confidence
            best_face = max(faces, key=lambda x: x[2] * x[3] * x[-1])
            fx, fy, fw, fh, conf = best_face[0], best_face[1], best_face[2], best_face[3], best_face[-1]
            
            # Criteria for clear face
            if fh >= 80 and fw >= 80 and conf >= 0.65 and fy < h * 0.70:
                face_size = fw * fh
                scored.append({
                    "file": f,
                    "box": (int(fx), int(fy), int(fw), int(fh)),
                    "conf": float(conf),
                    "face_size": face_size,
                    "dims": (w, h)
                })

    # Sort photos by face prominence
    scored.sort(key=lambda x: x["face_size"], reverse=True)
    
    if not scored:
        print(f"[!] Warning: No face found for {m}")
        continue
        
    # Best photo for avatar
    best_avatar_item = scored[0]
    best_file = best_avatar_item["file"]
    fx, fy, fw, fh = best_avatar_item["box"]
    img_w, img_h = best_avatar_item["dims"]
    
    # Generate perfect face-centered avatar
    src_path = os.path.join(m_dir, best_file)
    with Image.open(src_path) as pil_img:
        pil_img = pil_img.convert("RGB")
        
        # Calculate center of face
        cx = fx + fw / 2
        cy = fy + fh / 2
        
        # We want avatar box size to be ~2.0x the face size, or min(img_w, img_h)
        crop_size = int(max(fw, fh) * 2.1)
        crop_size = min(crop_size, img_w, img_h)
        
        left = int(cx - crop_size / 2)
        top = int(cy - crop_size * 0.45) # slightly higher to include hair
        
        # Clamp to image boundaries
        if left < 0:
            left = 0
        if top < 0:
            top = 0
        if left + crop_size > img_w:
            left = img_w - crop_size
        if top + crop_size > img_h:
            top = img_h - crop_size
            
        cropped = pil_img.crop((left, top, left + crop_size, top + crop_size))
        avatar_hd = cropped.resize((600, 600), Image.Resampling.LANCZOS)
        out_avatar = os.path.join(m_dir, "avatar.jpg")
        avatar_hd.save(out_avatar, "JPEG", quality=95)
        print(f"[{m.upper()}] Avatar generated from {best_file} centered on face ({fw}x{fh})")

    # Clean PAP list: only photos with clear face
    member_clean_paps[m] = [s["file"] for s in scored]
    print(f"  -> {len(member_clean_paps[m])} clear-face PAP photos selected for {m}")

print("\nSaving clean metadata...")

# Save json of clean paps
with open("clean_paps.json", "w") as f:
    json.dump(member_clean_paps, f, indent=2)

print("SUCCESS: Face avatars and clean PAP list generated!")

import os
import cv2
from PIL import Image

detector = cv2.FaceDetectorYN.create('yunet.onnx', '', (320, 320), score_threshold=0.5)

base_dir = "member_photos"
members = ['freya', 'michie', 'christy', 'gracia', 'ella', 'gita', 'marsha', 'muthe', 'minji', 'hanni', 'danielle', 'haerin', 'hyein']

print("=" * 60)
print("ANALYSIS OF MEMBER PHOTOS USING DEEP LEARNING FACE DETECTOR")
print("=" * 60)

member_good_photos = {}

for m in members:
    m_dir = os.path.join(base_dir, m)
    if not os.path.exists(m_dir):
        continue
        
    photos = [f for f in os.listdir(m_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) and f != 'avatar.jpg']
    scored_photos = []
    
    for f in photos:
        f_path = os.path.join(m_dir, f)
        img = cv2.imread(f_path)
        if img is None:
            continue
            
        h, w, _ = img.shape
        detector.setInputSize((w, h))
        _, faces = detector.detect(img)
        
        if faces is not None and len(faces) > 0:
            # Find largest / highest confidence face
            best_face = max(faces, key=lambda x: x[2] * x[3] * x[-1])
            fx, fy, fw, fh, conf = best_face[0], best_face[1], best_face[2], best_face[3], best_face[-1]
            
            # Face area ratio
            face_ratio = (fw * fh) / (w * h)
            face_center_y = fy + fh / 2
            
            # Criteria for clear face:
            # 1. Face height at least 80px
            # 2. Confidence >= 0.65
            # 3. Face is not cut off at top (fy >= -5)
            # 4. Face is in top 70% of image
            if fh >= 80 and fw >= 80 and conf >= 0.65 and fy < h * 0.65:
                # Score based on resolution, face size, and confidence
                score = (fw * fh) * conf
                scored_photos.append({
                    "file": f,
                    "score": score,
                    "box": (int(fx), int(fy), int(fw), int(fh)),
                    "conf": float(conf),
                    "dims": (w, h)
                })
        else:
            print(f"  [NO FACE] {m}/{f}")
            
    scored_photos.sort(key=lambda x: x["score"], reverse=True)
    member_good_photos[m] = scored_photos
    print(f"{m:10s}: {len(scored_photos)}/{len(photos)} clear face photos found (Best face size: {scored_photos[0]['box'][2]}x{scored_photos[0]['box'][3]} in {scored_photos[0]['file']})")

print("=" * 60)

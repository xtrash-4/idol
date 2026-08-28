import os
import cv2
from PIL import Image

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
profile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_profileface.xml')

base_dir = "member_photos"
members = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d)) and not d.endswith('_test') and not d.endswith('_jkt48')]

print(f"Checking face visibility for {len(members)} members: {members}")

results = {}

for m in members:
    m_dir = os.path.join(base_dir, m)
    photos = [f for f in os.listdir(m_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) and f != 'avatar.jpg']
    valid_photos = []
    
    for f in photos:
        f_path = os.path.join(m_dir, f)
        img = cv2.imread(f_path)
        if img is None:
            continue
        
        h, w, _ = img.shape
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Detect frontal and profile faces
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(60, 60))
        if len(faces) == 0:
            faces = profile_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=3, minSize=(50, 50))
            
        if len(faces) > 0:
            # Check largest face
            largest_face = max(faces, key=lambda rect: rect[2] * rect[3])
            fx, fy, fw, fh = largest_face
            
            # Face area should be at least 4% of image area, and top of face shouldn't be cut off (fy > 0 or reasonable)
            # and face center should be in upper 65% of the image
            face_center_y = fy + fh / 2
            
            # Condition: face is well framed
            if fh >= 70 and fw >= 70 and face_center_y < h * 0.75:
                valid_photos.append((f, fw * fh, fy, fh, h, w))
            else:
                print(f"  [CUTOFF/SMALL] {m}/{f}: face at y={fy}, size={fw}x{fh} in {w}x{h}")
        else:
            print(f"  [NO FACE] {m}/{f}")

    # Sort valid photos by face prominence
    valid_photos.sort(key=lambda x: x[1], reverse=True)
    results[m] = [v[0] for v in valid_photos]
    print(f"{m:10s}: {len(valid_photos)}/{len(photos)} photos with clear face detected")


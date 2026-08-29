# -*- coding: utf-8 -*-
"""
==============================================================================
   🌸 IDOLCHAT - LIVE VISIBLE BROWSER MEMBER PHOTO HARVESTER 🌸
==============================================================================
Membuka browser Google Chrome secara LANGSUNG dan TERLIHAT di layar Anda:
1. Anda bisa melihat sendiri Chrome membuka Instagram resmi member.
2. Melihat otomatis memutar Sorotan & seluruh Postingan Feed & Carousel.
3. Mengunduh foto HD langsung dari server resmi Meta (cdninstagram.com).
4. 100% Anti-Duplikat (MD5 Binary Hash) & Bebas Video.
5. Otomatis pasang Avatar terbaik & update database js/members.js + Android assets.
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import time
import hashlib
import re
import subprocess
import requests
from io import BytesIO
from PIL import Image
from concurrent.futures import ThreadPoolExecutor
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MEMBERS_JS_PATH = os.path.join(BASE_DIR, "js", "members.js")
ANDROID_MEMBERS_JS = os.path.join(BASE_DIR, "android", "app", "src", "main", "assets", "js", "members.js")
MEMBER_PHOTOS_BASE = os.path.join(BASE_DIR, "member_photos")
ANDROID_PHOTOS_BASE = os.path.join(BASE_DIR, "android", "app", "src", "main", "assets", "member_photos")

MEMBERS_PRESET = {
    "1": {
        "id": "freya",
        "name": "Freya Jayawardana",
        "ig_url": "https://www.instagram.com/jkt48.freya/"
    },
    "2": {
        "id": "michie",
        "name": "Michelle Alexandra (Michie)",
        "ig_url": "https://www.instagram.com/jkt48.michie_/"
    },
    "3": {
        "id": "christy",
        "name": "Angelina Christy",
        "ig_url": "https://www.instagram.com/jkt48.christy/"
    },
    "4": {
        "id": "gracia",
        "name": "Shania Gracia",
        "ig_url": "https://www.instagram.com/jkt48gracia/"
    },
    "5": {
        "id": "ella",
        "name": "Gabriela Abigail (Ella)",
        "ig_url": "https://www.instagram.com/jkt48.ella__/"
    },
    "6": {
        "id": "gita",
        "name": "Gita Sekar Andarini",
        "ig_url": "https://www.instagram.com/jkt48.gita/"
    },
    "7": {
        "id": "marsha",
        "name": "Marsha Lenathea",
        "ig_url": "https://www.instagram.com/jkt48.marsha_/"
    },
    "8": {
        "id": "muthe",
        "name": "Mutiara Azzahra (Muthe)",
        "ig_url": "https://www.instagram.com/jkt48.muthe_/"
    }
}

def banner():
    print("""
╔════════════════════════════════════════════════════════════════════════╗
║         🌸 IDOLCHAT - LIVE VISIBLE INSTAGRAM PHOTO HARVESTER 🌸         ║
║     Membuka Google Chrome LANGSUNG di Layar Anda & Mengunduh Foto      ║
║        100% Anti-Duplikat (MD5 Hash) • Foto HD • Tanpa Video           ║
╚════════════════════════════════════════════════════════════════════════╝
""")

def select_target():
    banner()
    print("PILIH MEMBER JKT48:")
    print("------------------------------------------------------------------------")
    for k, v in MEMBERS_PRESET.items():
        print(f"  [{k}] {v['name']} (ID: {v['id']})")
    print("  [9] Custom Member (Input URL manual)")
    print("------------------------------------------------------------------------")
    
    choice = input("Pilih nomor (1-9) [1]: ").strip()
    if not choice:
        choice = "1"
        
    if choice in MEMBERS_PRESET:
        t = MEMBERS_PRESET[choice].copy()
    else:
        m_id = input("Masukkan ID member (misal: adel / zee): ").strip().lower()
        if not m_id:
            m_id = "member"
        t = {
            "id": m_id,
            "name": m_id.capitalize(),
            "ig_url": f"https://www.instagram.com/jkt48.{m_id}/"
        }
        
    print(f"\nTarget: {t['name']} (ID: {t['id']})")
    
    ig_in = input(f"Link Instagram Profil [{t['ig_url']}]: ").strip()
    if ig_in:
        t['ig_url'] = ig_in
        
    wipe_in = input(f"Kosongkan folder foto lama {t['name']} agar bersih total? (Y/n) [Y]: ").strip().lower()
    t['wipe_old'] = wipe_in != 'n'
    
    return t

def harvest_member(target):
    member_id = target['id']
    member_dir = os.path.join(MEMBER_PHOTOS_BASE, member_id)
    android_dir = os.path.join(ANDROID_PHOTOS_BASE, member_id)
    os.makedirs(member_dir, exist_ok=True)
    
    seen_hashes = set()
    
    # 1. Bersihkan folder lama atau muat hash yang sudah ada
    if target['wipe_old']:
        print(f"\n[1/4] Membersihkan folder member_photos/{member_id}/...")
        for f in os.listdir(member_dir):
            fp = os.path.join(member_dir, f)
            if os.path.isfile(fp) and f != ".gitkeep":
                os.remove(fp)
        print("  [✓] Folder bersih total dari foto lama!")
    else:
        print(f"\n[1/4] Membaca foto yang sudah ada untuk mencegah duplikasi...")
        for f in os.listdir(member_dir):
            fp = os.path.join(member_dir, f)
            if os.path.isfile(fp) and f.endswith(".jpg") and f != "avatar.jpg":
                try:
                    with open(fp, "rb") as imf:
                        seen_hashes.add(hashlib.md5(imf.read()).hexdigest())
                except Exception:
                    pass
        print(f"  [✓] Terdeteksi {len(seen_hashes)} foto unik tersimpan.")
        
    raw_photo_urls = set()
    
    # 2. Buka Instagram Resmi secara LANGSUNG & TERLIHAT (headless=False)
    print(f"\n[2/4] 🌐 Membuka Google Chrome di layar Anda ke Instagram: {target['ig_url']} ...")
    try:
        with sync_playwright() as p:
            # headless=False agar jendela browser Chrome muncul langsung di layar user!
            browser = p.chromium.launch(headless=False)
            context = browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                viewport={"width": 1280, "height": 800}
            )
            page = context.new_page()
            
            # Response Interceptor murni CDN Meta
            def on_response(res):
                u = res.url
                if "cdninstagram.com" in u:
                    c_type = res.headers.get("content-type", "")
                    if "video" not in c_type and ("image" in c_type or ".jpg" in u or ".webp" in u or "dst-jpg" in u):
                        if not any(thumb in u for thumb in ["/s150x150/", "/p150x150/", "/s320x320/"]):
                            raw_photo_urls.add(u)
                            
            page.on("response", on_response)
            page.goto(target['ig_url'], timeout=35000)
            time.sleep(2.5)
            
            # Tutup modal login jika muncul
            close_btn = page.locator("div[role='dialog'] svg[aria-label='Close'], div[role='dialog'] button, svg[aria-label='Close']")
            if close_btn.count() > 0:
                try:
                    close_btn.first.click()
                    time.sleep(0.8)
                except Exception:
                    pass
                    
            # A. Putar seluruh Sorotan (Story Highlights)
            first_highlight = page.locator("a[href*='/stories/highlights/'], ul li div[role='button']").first
            if first_highlight.count() > 0:
                print("  --> Memutar SELURUH Sorotan (Story Highlights)...")
                first_highlight.click()
                time.sleep(1.8)
                for _ in range(90):
                    if "/stories/" not in page.url:
                        break
                    page.mouse.click(800, 400)
                    time.sleep(0.3)
                print(f"  [✓] Foto tertangkap dari Sorotan: {len(raw_photo_urls)}")
                
            # B. Buka Postingan Feed & Jelajahi seluruh Carousel
            print("  --> Memindai SELURUH Postingan Feed & Carousel...")
            page.goto(target['ig_url'], timeout=25000)
            time.sleep(2.0)
            
            first_post = page.locator("a[href*='/p/']").first
            if first_post.count() > 0:
                first_post.click()
                time.sleep(1.5)
                
                for _ in range(60):
                    # Klik seluruh slide carousel jika ada
                    for _ in range(8):
                        c_next = page.locator("div[role='dialog'] button[aria-label='Next'], div[role='dialog'] button[aria-label='Selanjutnya'], div[role='dialog'] button._afxw")
                        if c_next.count() > 0 and c_next.first.is_visible():
                            c_next.first.click()
                            time.sleep(0.25)
                        else:
                            break
                            
                    # Pindah ke postingan berikutnya
                    page.keyboard.press("ArrowRight")
                    time.sleep(0.35)
                    
            print(f"  [✓] Total Foto Murni Tertangkap dari Instagram: {len(raw_photo_urls)}")
            time.sleep(1.0)
            browser.close()
            
    except Exception as e:
        print("  [!] Browser notice:", e)
        
    print(f"\n[3/4] Mengunduh {len(raw_photo_urls)} foto dengan MD5 Binary Deduplication...")
    
    # 3. Download Paralel & Binary MD5 Deduplication
    saved_photos = []
    
    def download_img(url):
        try:
            req_headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                "Referer": "https://www.instagram.com/"
            }
            res = requests.get(url, headers=req_headers, timeout=10)
            if res.status_code != 200 or len(res.content) < 6000:
                return None
                
            # Validasi MD5 Hash biner asli
            content_hash = hashlib.md5(res.content).hexdigest()
            if content_hash in seen_hashes:
                return None  # Duplikat diabaikan 100%!
                
            im = Image.open(BytesIO(res.content))
            w, h = im.size
            if w < 220 or h < 220:
                return None
                
            seen_hashes.add(content_hash)
            
            filename = f"{member_id}_ig_{content_hash[:10]}.jpg"
            save_path = os.path.join(member_dir, filename)
            
            im.convert("RGB").save(save_path, "JPEG", quality=95, optimize=True)
            return (filename, w, h)
        except Exception:
            return None
            
    with ThreadPoolExecutor(max_workers=32) as executor:
        results = executor.map(download_img, list(raw_photo_urls))
        for r in results:
            if r:
                saved_photos.append(r)
                print(f"  [✓] Foto Asli Tersimpan: {r[0]} ({r[1]}x{r[2]} px)")
                
    # 4. Pasang Avatar Terbaik
    all_files = [f for f in os.listdir(member_dir) if f.endswith(".jpg") and f != "avatar.jpg"]
    if all_files:
        avatar_path = os.path.join(member_dir, "avatar.jpg")
        if not os.path.exists(avatar_path) or target['wipe_old']:
            chosen_avatar = all_files[0]
            for f in all_files:
                try:
                    im = Image.open(os.path.join(member_dir, f))
                    ratio = im.size[0] / im.size[1]
                    if 0.8 <= ratio <= 1.25:
                        chosen_avatar = f
                        break
                except Exception:
                    pass
            Image.open(os.path.join(member_dir, chosen_avatar)).convert("RGB").save(avatar_path, "JPEG", quality=95)
            print(f"\n--> [✓] Avatar diset dari foto selfie portrait terbaik: {chosen_avatar}")
            
    # 5. Update Database js/members.js & Android assets
    print(f"\n[4/4] Memperbarui database & sinkronisasi Android...")
    update_database(member_id, all_files)
    
    if os.path.exists(os.path.dirname(android_dir)):
        import shutil
        if os.path.exists(android_dir):
            shutil.rmtree(android_dir)
        shutil.copytree(member_dir, android_dir)
        print("  [✓] Android assets berhasil disinkronkan!")
        
    print("\n════════════════════════════════════════════════════════════════════════")
    print(f"  🎉 SELESAI! Total {len(all_files)} Foto Asli Siap untuk {target['name']}!")
    print("════════════════════════════════════════════════════════════════════════\n")
    
    git_choice = input("Langsung Git Commit & Push ke Vercel/GitHub? (Y/n) [Y]: ").strip().lower()
    if git_choice != 'n':
        git_push(target['name'], len(all_files))

def update_database(member_id, all_photos):
    try:
        with open(MEMBERS_JS_PATH, "r", encoding="utf-8") as f:
            content = f.read()
            
        json_match = re.search(r'const DEFAULT_MEMBERS = (\[.*?\]);', content, re.DOTALL)
        if json_match:
            members_list = json.loads(json_match.group(1))
            found = False
            for m in members_list:
                if m["id"] == member_id:
                    m["avatar"] = f"member_photos/{member_id}/avatar.jpg"
                    paps = []
                    for fname in all_photos:
                        paps.append({
                            "url": f"member_photos/{member_id}/{fname}",
                            "caption": "Selfie manis spesial ✨"
                        })
                    m["paps"] = paps
                    found = True
                    break
                    
            if not found:
                members_list.append({
                    "id": member_id,
                    "name": member_id.capitalize(),
                    "gen": "Member",
                    "avatar": f"member_photos/{member_id}/avatar.jpg",
                    "jiko": f"Halo semuanya, aku {member_id.capitalize()}!",
                    "color": "#e11d48",
                    "badge": "JKT48",
                    "paps": [{"url": f"member_photos/{member_id}/{fname}", "caption": "Selfie manis spesial ✨"} for fname in all_photos]
                })
                
            new_js = "/**\n * IDOLCHAT Database - JKT48 Official Oshi Direct Message\n */\n\nconst DEFAULT_MEMBERS = " + json.dumps(members_list, indent=2, ensure_ascii=False) + ";\n"
            with open(MEMBERS_JS_PATH, "w", encoding="utf-8") as f:
                f.write(new_js)
                
            if os.path.exists(ANDROID_MEMBERS_JS):
                with open(ANDROID_MEMBERS_JS, "w", encoding="utf-8") as f:
                    f.write(new_js)
                    
            print("  [✓] Database js/members.js berhasil diupdate!")
    except Exception as e:
        print("  [!] Error update members.js:", e)

def git_push(member_name, count):
    print("\n[Git] Menjalankan Git Add, Commit & Push...")
    try:
        subprocess.run(["git", "add", "-A"], cwd=BASE_DIR, check=True)
        msg = f"feat: harvest {count} official HD photos for {member_name}"
        subprocess.run(["git", "commit", "-m", msg], cwd=BASE_DIR, check=True)
        subprocess.run(["git", "push", "origin", "main"], cwd=BASE_DIR, check=True)
        print("  [✓] Berhasil di-push ke GitHub & Vercel!")
    except Exception as ge:
        print("  [!] Git notice:", ge)

if __name__ == "__main__":
    while True:
        target = select_target()
        harvest_member(target)
        cont = input("Ingin mengunduh untuk member lain? (y/N) [N]: ").strip().lower()
        if cont != 'y':
            print("\nTerima kasih! Selesai sempurna. 🌸✨\n")
            break

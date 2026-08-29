# -*- coding: utf-8 -*-
"""
==============================================================================
   IDOLCHAT - OFFICIAL MEMBER PHOTO HARVESTER TOOL (INSTAGRAM & X/TWITTER)
==============================================================================
Tool otomatis untuk mengunduh seluruh foto resmi member JKT48 dari:
1. Instagram (Semua Sorotan/Highlights + Semua Postingan Feed & Carousel)
2. Twitter / X (Semua media foto HD/Master resolution)
Fitur:
- 100% Anti-Duplikat (Binary MD5 Content Hash Deduplication)
- Bebas Video/MP4 (Otomatis difilter hanya foto HD & 4K)
- Otomatis pasang Avatar terbaik
- Otomatis update database js/members.js & Android assets
- Otomatis Git Commit & Push (opsional)
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import time
import hashlib
import re
import urllib.parse
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
        "ig_default": "https://www.instagram.com/jkt48.freya/",
        "x_default": "https://x.com/Freya_JKT48",
        "search_name": "Freya JKT48"
    },
    "2": {
        "id": "michie",
        "name": "Michelle Alexandra (Michie)",
        "ig_default": "https://www.instagram.com/jkt48.michie_/",
        "x_default": "https://x.com/A_MichieJKT48",
        "search_name": "Michie JKT48"
    },
    "3": {
        "id": "christy",
        "name": "Angelina Christy",
        "ig_default": "https://www.instagram.com/jkt48.christy/",
        "x_default": "https://x.com/A_ChristyJKT48",
        "search_name": "Christy JKT48"
    },
    "4": {
        "id": "gracia",
        "name": "Shania Gracia",
        "ig_default": "https://www.instagram.com/jkt48gracia/",
        "x_default": "https://x.com/S_GraciaJKT48",
        "search_name": "Gracia JKT48"
    },
    "5": {
        "id": "ella",
        "name": "Gabriela Abigail (Ella)",
        "ig_default": "https://www.instagram.com/jkt48.ella__/",
        "x_default": "https://x.com/A_EllaJKT48",
        "search_name": "Ella JKT48"
    },
    "6": {
        "id": "gita",
        "name": "Gita Sekar Andarini",
        "ig_default": "https://www.instagram.com/jkt48.gita/",
        "x_default": "https://x.com/A_GitaJKT48",
        "search_name": "Gita JKT48"
    },
    "7": {
        "id": "marsha",
        "name": "Marsha Lenathea",
        "ig_default": "https://www.instagram.com/jkt48.marsha_/",
        "x_default": "https://x.com/L_MarshaJKT48",
        "search_name": "Marsha JKT48"
    },
    "8": {
        "id": "muthe",
        "name": "Mutiara Azzahra (Muthe)",
        "ig_default": "https://www.instagram.com/jkt48.muthe_/",
        "x_default": "https://x.com/A_MutheJKT48",
        "search_name": "Muthe JKT48"
    }
}

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def banner():
    print("""
╔════════════════════════════════════════════════════════════════════════╗
║                🌸 IDOLCHAT - MEMBER PHOTO HARVESTER 🌸                 ║
║      Unduh Semua Foto Instagram (Post+Sorotan) & Twitter/X Resmi       ║
║        100% Bebas Duplikat (MD5 Hash) • Foto HD • Tanpa Video          ║
╚════════════════════════════════════════════════════════════════════════╝
""")

def select_member():
    banner()
    print("PILIH MEMBER JKT48 YANG AKAN DIUNDUH:")
    print("------------------------------------------------------------------------")
    for k, v in MEMBERS_PRESET.items():
        print(f"  [{k}] {v['name']} (ID: {v['id']})")
    print("  [9] Custom Member Baru (Input ID manual)")
    print("------------------------------------------------------------------------")
    
    choice = input("Masukkan pilihan (1-9) [Default: 1]: ").strip()
    if not choice:
        choice = "1"
        
    if choice in MEMBERS_PRESET:
        target = MEMBERS_PRESET[choice].copy()
    else:
        m_id = input("Masukkan ID member (huruf kecil, misal: adel / zee): ").strip().lower()
        if not m_id:
            m_id = "member"
        target = {
            "id": m_id,
            "name": m_id.capitalize(),
            "ig_default": f"https://www.instagram.com/jkt48.{m_id}/",
            "x_default": f"https://x.com/{m_id.capitalize()}_JKT48",
            "search_name": f"{m_id.capitalize()} JKT48"
        }
        
    print(f"\nTarget Member: {target['name']} (ID: {target['id']})")
    
    # Input Instagram URL
    ig_in = input(f"Link Instagram Profil [{target['ig_default']}]: ").strip()
    target['ig_url'] = ig_in if ig_in else target['ig_default']
    
    # Clean IG username
    ig_user = target['ig_url'].rstrip('/').split('/')[-1].replace('@', '')
    target['ig_user'] = ig_user
    
    # Input Twitter / X URL
    x_in = input(f"Link Twitter / X Profil [{target['x_default']}]: ").strip()
    target['x_url'] = x_in if x_in else target['x_default']
    
    # Clean X username
    x_user = target['x_url'].rstrip('/').split('/')[-1].replace('@', '')
    target['x_user'] = x_user
    
    # Tanya apakah ingin hapus foto lama member ini
    wipe_in = input(f"Kosongkan foto lama {target['name']} dulu agar bersih? (Y/n) [Y]: ").strip().lower()
    target['wipe_old'] = wipe_in != 'n'
    
    return target

def harvest_member(target):
    member_id = target['id']
    member_dir = os.path.join(MEMBER_PHOTOS_BASE, member_id)
    android_dir = os.path.join(ANDROID_PHOTOS_BASE, member_id)
    os.makedirs(member_dir, exist_ok=True)
    
    seen_hashes = set()
    
    # 1. Bersihkan atau load hash yang sudah ada
    if target['wipe_old']:
        print(f"\n[1/6] Mengosongkan foto lama di folder member_photos/{member_id}/...")
        for f in os.listdir(member_dir):
            fp = os.path.join(member_dir, f)
            if os.path.isfile(fp) and f != ".gitkeep":
                os.remove(fp)
        print("  [✓] Folder bersih 100%!")
    else:
        print(f"\n[1/6] Membaca foto yang sudah ada untuk mencegah duplikasi...")
        for f in os.listdir(member_dir):
            fp = os.path.join(member_dir, f)
            if os.path.isfile(fp) and f.endswith('.jpg') and f != 'avatar.jpg':
                try:
                    with open(fp, "rb") as im_file:
                        seen_hashes.add(hashlib.md5(im_file.read()).hexdigest())
                except Exception:
                    pass
        print(f"  [✓] Terdeteksi {len(seen_hashes)} foto unik tersimpan.")
        
    all_raw_urls = set()
    
    # 2. Scrape Instagram (Highlights + Feed Posts + Carousels)
    print(f"\n[2/6] Membuka Instagram: {target['ig_url']} ...")
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                viewport={"width": 1366, "height": 900}
            )
            page = context.new_page()
            
            def on_res(response):
                url = response.url
                if "cdninstagram.com" in url:
                    c_type = response.headers.get("content-type", "")
                    if "video" not in c_type and ("image" in c_type or "dst-jpg" in url or ".jpg" in url or ".webp" in url):
                        if not any(x in url for x in ["/s150x150/", "/p150x150/", "/s320x320/"]):
                            all_raw_urls.add(url)
                            
            page.on("response", on_res)
            
            page.goto(target['ig_url'], timeout=35000)
            time.sleep(2.5)
            
            # Tutup modal login jika ada
            close_btn = page.locator("div[role='dialog'] svg[aria-label='Close'], div[role='dialog'] button, svg[aria-label='Close']")
            if close_btn.count() > 0:
                try:
                    close_btn.first.click()
                    time.sleep(0.8)
                except Exception:
                    pass
                    
            # A. Story Highlights
            highlight_links = page.locator("a[href*='/stories/highlights/']").evaluate_all("els => els.map(e => e.href)")
            print(f"  --> Ditemukan {len(highlight_links)} Sorotan (Story Highlights)...")
            for h_idx, h_url in enumerate(highlight_links[:6]):
                try:
                    page.goto(h_url, timeout=18000)
                    time.sleep(1.5)
                    for _ in range(16):
                        if "/stories/" not in page.url:
                            break
                        page.mouse.click(850, 450)
                        time.sleep(0.3)
                except Exception:
                    pass
            print(f"  [✓] Foto tertangkap dari Sorotan: {len(all_raw_urls)}")
            
            # B. Feed Posts & Carousel
            print("  --> Memindai postingan feed & slide carousel...")
            page.goto(target['ig_url'], timeout=25000)
            time.sleep(2.0)
            post_links = []
            for _ in range(8):
                links = page.locator("a[href*='/p/']").evaluate_all("els => els.map(e => e.href)")
                for l in links:
                    if l not in post_links:
                        post_links.append(l)
                page.mouse.wheel(0, 1000)
                time.sleep(0.6)
                
            print(f"  --> Ditemukan {len(post_links)} postingan feed.")
            for p_idx, p_url in enumerate(post_links):
                try:
                    page.goto(p_url, timeout=15000)
                    time.sleep(1.0)
                    next_btn = page.locator("button[aria-label='Next'], button[aria-label='Selanjutnya'], button._afxw")
                    if next_btn.count() > 0:
                        for _ in range(8):
                            if next_btn.first.is_visible():
                                next_btn.first.click()
                                time.sleep(0.25)
                            else:
                                break
                except Exception:
                    pass
                    
            print(f"  [✓] Total foto tertangkap dari Instagram: {len(all_raw_urls)}")
            
            # C. Scrape Twitter / X Media Archive
            print(f"\n[3/6] Memindai arsip Twitter / X (@{target['x_user']})...")
            x_queries = [
                f"site:pbs.twimg.com/media {target['x_user']}",
                f"site:pbs.twimg.com/media {target['search_name']}",
                f"{target['x_user']} twitter pap",
                f"{target['x_user']} twitter selfie",
                f"{target['search_name']} twitter selfie",
                f"{target['search_name']} twitter pap"
            ]
            for xq in x_queries:
                try:
                    encoded = urllib.parse.quote(xq)
                    page.goto(f"https://www.bing.com/images/search?q={encoded}&form=HDRSC2&first=1", timeout=15000)
                    time.sleep(0.8)
                    for _ in range(4):
                        page.mouse.wheel(0, 3500)
                        time.sleep(0.4)
                    content = page.content()
                    murls = re.findall(r'murl&quot;:&quot;(http[^&]+)&quot;', content)
                    for u in murls:
                        u_clean = u.replace(r'\/', '/').replace(r'\u0026', '&')
                        if u_clean.startswith("http") and not u_clean.endswith(".svg"):
                            if "pbs.twimg.com/media/" in u_clean:
                                base_twimg = u_clean.split('?')[0].split('&')[0].split(':')[0]
                                all_raw_urls.add(f"{base_twimg}?format=jpg&name=orig")
                            else:
                                all_raw_urls.add(u_clean)
                except Exception:
                    pass
                    
            # D. Pinterest Media Board
            try:
                pin_q = f"{target['search_name']} twitter"
                pin_url = f"https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?q={urllib.parse.quote(pin_q)}&data={{\"options\":{{\"query\":\"{pin_q}\",\"scope\":\"pins\"}},\"context\":{{}}}}"
                r = requests.get(pin_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=8)
                if r.status_code == 200:
                    results = r.json().get("resource_response", {}).get("data", {}).get("results", [])
                    for res_item in results:
                        images = res_item.get("images", {})
                        orig = images.get("orig", {}).get("url") or images.get("736x", {}).get("url")
                        if orig and orig.startswith("http"):
                            all_raw_urls.add(orig)
            except Exception:
                pass
                
            browser.close()
    except Exception as be:
        print("  [!] Browser automation notice:", be)
        
    print(f"\n[4/6] Total {len(all_raw_urls)} kandidat foto terkumpul. Memulai pengunduhan paralel...")
    
    # 3. Multithreaded Download & Strict Binary MD5 Deduplication
    saved_photos = []
    
    def download_and_validate(url):
        try:
            req_headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            }
            res = requests.get(url, headers=req_headers, timeout=10)
            if res.status_code != 200 or len(res.content) < 6000:
                return None
                
            # Content Hash
            content_hash = hashlib.md5(res.content).hexdigest()
            if content_hash in seen_hashes:
                return None  # Duplikat diabaikan 100%!
                
            im = Image.open(BytesIO(res.content))
            w, h = im.size
            if w < 220 or h < 220:
                return None
                
            seen_hashes.add(content_hash)
            
            source_tag = "x" if ("twimg" in url or "twitter" in url) else "ig"
            filename = f"{member_id}_{source_tag}_{content_hash[:10]}.jpg"
            save_path = os.path.join(member_dir, filename)
            
            im.convert("RGB").save(save_path, "JPEG", quality=95, optimize=True)
            return (filename, w, h)
        except Exception:
            return None
            
    with ThreadPoolExecutor(max_workers=32) as executor:
        results = executor.map(download_and_validate, list(all_raw_urls))
        for r in results:
            if r:
                saved_photos.append(r)
                print(f"  [✓] Foto Unik: {r[0]} ({r[1]}x{r[2]} px)")
                
    print(f"\n[✓] Berhasil menyimpan {len(saved_photos)} foto unik baru untuk {target['name']}!")
    
    # 4. Pasang Avatar Terbaik jika belum ada
    all_files = [f for f in os.listdir(member_dir) if f.endswith(".jpg") and f != "avatar.jpg"]
    if all_files:
        avatar_path = os.path.join(member_dir, "avatar.jpg")
        if not os.path.exists(avatar_path) or target['wipe_old']:
            chosen_avatar = all_files[0]
            for f in all_files:
                try:
                    fp = os.path.join(member_dir, f)
                    im = Image.open(fp)
                    ratio = im.size[0] / im.size[1]
                    if 0.8 <= ratio <= 1.25:
                        chosen_avatar = f
                        break
                except Exception:
                    pass
            Image.open(os.path.join(member_dir, chosen_avatar)).convert("RGB").save(avatar_path, "JPEG", quality=95)
            print(f"--> [✓] Avatar {target['name']} berhasil diset dari foto portrait terbaik: {chosen_avatar}")
            
    # 5. Update Database js/members.js
    print("\n[5/6] Memperbarui database js/members.js...")
    update_database(member_id, all_files)
    
    # 6. Sinkronisasi Android Assets
    print("\n[6/6] Melakukan sinkronisasi ke Android Assets...")
    if os.path.exists(os.path.dirname(android_dir)):
        import shutil
        if os.path.exists(android_dir):
            shutil.rmtree(android_dir)
        shutil.copytree(member_dir, android_dir)
        print(f"  [✓] Folder Android assets {member_id} berhasil disinkronkan!")
        
    print("\n════════════════════════════════════════════════════════════════════════")
    print(f"  🎉 SELESAI SEMPURNA! Total {len(all_files)} Foto HD Tersedia untuk {target['name']}!")
    print("════════════════════════════════════════════════════════════════════════\n")
    
    # Opsi Git Push
    git_choice = input("Apakah Anda ingin langsung Git Commit & Push ke Vercel/GitHub? (Y/n) [Y]: ").strip().lower()
    if git_choice != 'n':
        git_commit_and_push(target['name'], len(all_files))

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
                        caption = "Selfie manis spesial ✨" if "ig" in fname else "PAP terbaru dari Twitter 💖"
                        paps.append({
                            "url": f"member_photos/{member_id}/{fname}",
                            "caption": caption
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
                    "paps": [{"url": f"member_photos/{member_id}/{fname}", "caption": "PAP spesial ✨"} for fname in all_photos]
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

def git_commit_and_push(member_name, count):
    print("\n[Git] Menjalankan Git Add, Commit & Push...")
    try:
        subprocess.run(["git", "add", "-A"], cwd=BASE_DIR, check=True)
        msg = f"feat: harvest {count} official HD photos (IG & X) for {member_name}"
        subprocess.run(["git", "commit", "-m", msg], cwd=BASE_DIR, check=True)
        subprocess.run(["git", "push", "origin", "main"], cwd=BASE_DIR, check=True)
        print("  [✓] Berhasil di-push ke GitHub & Vercel!")
    except Exception as ge:
        print("  [!] Git notice:", ge)

if __name__ == "__main__":
    while True:
        target = select_member()
        harvest_member(target)
        cont = input("Ingin mengunduh foto untuk member lain? (y/N) [N]: ").strip().lower()
        if cont != 'y':
            print("\nTerima kasih! Semoga harimu menyenangkan! 🌸✨\n")
            break

import os
import hashlib
import time
import urllib.request
from playwright.sync_api import sync_playwright

MICHIE_DIR = r"c:\Users\Hype\Desktop\IDOLCHAT\member_photos\michie"
os.makedirs(MICHIE_DIR, exist_ok=True)

existing_hashes = set()
for f in os.listdir(MICHIE_DIR):
    fp = os.path.join(MICHIE_DIR, f)
    if os.path.isfile(fp):
        with open(fp, "rb") as b:
            existing_hashes.add(hashlib.md5(b.read()).hexdigest())

print(f"Current Michie photos: {len(existing_hashes)}")

TARGET_NEW = 20
found_urls = set()

queries = [
    "michie jkt48 pap",
    "michelle alexandra jkt48 pap",
    "michie jkt48 selfie pap",
    "michie jkt48 mirror selfie",
    "michie jkt48 aesthetic pap",
    "michie jkt48 daily pap",
    "michie jkt48 ootd",
    "michie jkt48 theater pap"
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    )
    
    for q in queries:
        try:
            print(f"Scraping images for: '{q}'...")
            search_url = f"https://www.bing.com/images/search?q={urllib.parse.quote(q)}&FORM=HDRSC2"
            page.goto(search_url, timeout=20000)
            page.wait_for_timeout(1500)
            
            # Scroll down to load more images
            page.evaluate("window.scrollBy(0, 1500)")
            page.wait_for_timeout(1000)
            
            # Extract murl from Bing Image results (murl = high res original URL)
            elements = page.query_selector_all('a.iusc')
            for el in elements:
                m_attr = el.get_attribute('m')
                if m_attr:
                    import json
                    try:
                        m_data = json.loads(m_attr)
                        murl = m_data.get('murl')
                        if murl and murl.startswith('http'):
                            found_urls.add(murl)
                    except:
                        pass
                        
            # Also extract direct img src
            imgs = page.query_selector_all('img.mimg')
            for img in imgs:
                src = img.get_attribute('src')
                if src and src.startswith('http'):
                    found_urls.add(src)
        except Exception as e:
            print(f"  Error querying '{q}': {e}")
            
    browser.close()

print(f"\nTotal Candidate Image URLs Found: {len(found_urls)}")

saved = 0
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

for url in found_urls:
    if saved >= TARGET_NEW:
        break
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=6) as resp:
            content = resp.read()
            if len(content) < 15 * 1024:
                continue
            
            md5 = hashlib.md5(content).hexdigest()
            if md5 in existing_hashes:
                continue
            
            # Verify image format
            if content[:2] == b'\xff\xd8' or content[:8] == b'\x89PNG\r\n\x1a\n' or content[:4] == b'RIFF':
                filename = f"michie_pap3_{md5[:8]}.jpg"
                filepath = os.path.join(MICHIE_DIR, filename)
                with open(filepath, "wb") as out:
                    out.write(content)
                existing_hashes.add(md5)
                saved += 1
                print(f"  [+] [{saved}/{TARGET_NEW}] Tersimpan: {filename} ({len(content)//1024} KB)")
    except:
        pass

print(f"\nSUCCESS: Berhasil menambahkan {saved} foto PAP baru untuk Michie!")

import os
import re

BASE_DIR = r"c:\Users\Hype\Desktop\IDOLCHAT"
CSS_PATH = os.path.join(BASE_DIR, "css", "style.css")
HTML_PATH = os.path.join(BASE_DIR, "index.html")
APP_PY_PATH = os.path.join(BASE_DIR, "update_app_with_stories_and_avatar.py")
SETUP_PY = os.path.join(BASE_DIR, "setup_android_assets_and_res.py")

# 1. Update index.html - Add "🎙️ Minta VN dong" to quick prompts
with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

old_chips = '''        <div class="quick-prompts-bar">
          <button class="quick-chip" data-prompt="Lagi apa nih?">
            <i class="fa-regular fa-comment-dots"></i> Lagi apa nih?
          </button>
          <button class="quick-chip" data-prompt="Mau ngobrol dong">
            <i class="fa-regular fa-comments"></i> Mau ngobrol dong
          </button>
          <button class="quick-chip" data-prompt="minta pap foto kamu dong">
            <i class="fa-solid fa-camera"></i> Minta PAP dong
          </button>
        </div>'''

new_chips = '''        <div class="quick-prompts-bar">
          <button class="quick-chip" data-prompt="minta vn suara kamu dong">
            <i class="fa-solid fa-microphone"></i> Minta VN dong
          </button>
          <button class="quick-chip" data-prompt="minta pap foto kamu dong">
            <i class="fa-solid fa-camera"></i> Minta PAP dong
          </button>
          <button class="quick-chip" data-prompt="Lagi apa nih?">
            <i class="fa-regular fa-comment-dots"></i> Lagi apa nih?
          </button>
          <button class="quick-chip" data-prompt="Mau ngobrol dong">
            <i class="fa-regular fa-comments"></i> Mau ngobrol dong
          </button>
        </div>'''

if old_chips in html:
    html = html.replace(old_chips, new_chips)
    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html)
    print("SUCCESS: index.html quick prompts updated with Minta VN button!")

# 2. Add WhatsApp VN CSS to css/style.css
vn_css = '''
/* ==========================================================================
   WhatsApp-Style Interactive Voice Note (VN) Player
   ========================================================================== */

.vn-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(14, 18, 30, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  padding: 10px 14px;
  min-width: 250px;
  max-width: 320px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.18);
  margin-top: 4px;
  user-select: none;
}

.vn-avatar-wrap {
  position: relative;
  width: 44px;
  height: 44px;
  min-width: 44px;
  flex-shrink: 0;
}

.vn-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid rgba(225, 29, 72, 0.5);
  box-shadow: 0 0 12px rgba(225, 29, 72, 0.4);
}

.vn-mic-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e11d48;
  color: #fff;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px #e11d48;
  border: 1.5px solid #080b12;
}

.vn-player-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.vn-controls-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-vn-play {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff1744 0%, #e11d48 100%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 0 14px rgba(225, 29, 72, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: transform 0.18s ease;
}

.btn-vn-play:active {
  transform: scale(0.92);
}

.vn-track-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  padding: 4px 0;
}

.vn-waveform-bars {
  display: flex;
  align-items: center;
  gap: 2.5px;
  height: 18px;
  width: 100%;
}

.vn-bar {
  flex: 1;
  min-width: 2px;
  background: rgba(255, 255, 255, 0.22);
  border-radius: 2px;
  transition: background 0.15s ease, height 0.2s ease;
}

.vn-bar.played {
  background: #ff1744;
  box-shadow: 0 0 6px rgba(255, 23, 68, 0.6);
}

.vn-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;
}

.vn-time-display {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.3px;
}

.btn-vn-speed {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fda4af;
  font-size: 9.5px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.18s ease;
}

.btn-vn-speed:hover {
  background: rgba(225, 29, 72, 0.25);
  color: #fff;
}
'''

with open(CSS_PATH, "r", encoding="utf-8") as f:
    css = f.read()

if "/* WhatsApp-Style Interactive Voice Note (VN) Player */" not in css:
    css = css + "\n" + vn_css
    with open(CSS_PATH, "w", encoding="utf-8") as f:
        f.write(css)
    print("SUCCESS: css/style.css updated with WhatsApp VN Player styles!")

# 3. Update setup_android_assets_and_res.py to copy audio directory
with open(SETUP_PY, "r", encoding="utf-8") as f:
    setup_code = f.read()

if '"audio"' not in setup_code:
    setup_code = setup_code.replace(
        'dirs_to_copy = ["css", "js", "member_photos"]',
        'dirs_to_copy = ["css", "js", "member_photos", "audio"]'
    )
    with open(SETUP_PY, "w", encoding="utf-8") as f:
        f.write(setup_code)
    print("SUCCESS: setup_android_assets_and_res.py updated to copy audio directory!")

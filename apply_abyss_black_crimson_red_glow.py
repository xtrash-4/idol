import os
import re

HTML_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\index.html"
CSS_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\css\style.css"

# 1. Update index.html - replace MH text with a luxury glowing symbol
with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# Replace <div class="brand-logo">MH</div> with sleek ruby fire/sparkle symbol
html = re.sub(
    r'<div class="brand-logo">[\s\S]*?</div>',
    '<div class="brand-logo" title="MPRUYY HALU"><i class="fa-solid fa-fire-flame-curved"></i></div>',
    html
)

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: index.html brand logo updated to luxury symbol!")

# 2. Update css/style.css
with open(CSS_PATH, "r", encoding="utf-8") as f:
    css = f.read()

# Update :root tokens for Abyss Black & Crimson Red Glow
crimson_tokens = '''/* ==========================================================================
   IDOLCHAT - Luxury Abyss Black & Crimson Red Glow Design System
   Aesthetic: True Pitch Abyss Black (#030508), Ruby Crimson Neon Glow, Liquid Glass
   ========================================================================== */

:root {
  /* Core Base Colors - Deep Obsidian & True Abyss Void */
  --bg-deep: #030508;
  --bg-surface: #07090e;
  --bg-card: rgba(10, 14, 22, 0.72);
  --bg-card-hover: rgba(18, 22, 34, 0.90);
  --bg-card-solid: #080b12;
  --bg-input: rgba(10, 14, 22, 0.85);

  /* High-Definition Liquid Glass Tokens (Abyss Edition) */
  --glass-surface: rgba(10, 14, 22, 0.75);
  --glass-surface-subtle: rgba(255, 255, 255, 0.04);
  --glass-surface-hover: rgba(18, 24, 38, 0.88);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-border-bright: rgba(255, 255, 255, 0.28);
  --glass-border-focus: rgba(225, 29, 72, 0.75);
  --glass-specular: inset 0 1px 0 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 0 rgba(0, 0, 0, 0.5);
  --glass-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08);
  --glass-shadow-hover: 0 24px 60px -8px rgba(0, 0, 0, 0.95), 0 0 28px rgba(225, 29, 72, 0.25);
  --glass-blur: blur(32px) saturate(200%);

  /* Crimson Red Glow & Luxury Ruby Palette */
  --accent-primary: #e11d48;
  --accent-primary-hover: #ff1744;
  --accent-rose: #f43f5e;
  --accent-crimson: #e11d48;
  --accent-ruby: #9f1239;
  --accent-gold: #fbbf24;
  --accent-jkt48: #e11d48;
  --accent-newjeans: #38bdf8;

  --accent-gradient: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
  --accent-gradient-btn: linear-gradient(135deg, #ff1744 0%, #e11d48 50%, #9f1239 100%);
  --accent-silver-btn-active: linear-gradient(135deg, #ff1744 0%, #e11d48 100%);
  --accent-glow: rgba(225, 29, 72, 0.45);

  /* Chat Bubbles: Liquid Glass & Dark Obsidian */
  --bubble-user: linear-gradient(135deg, rgba(35, 40, 52, 0.92) 0%, rgba(20, 24, 34, 0.96) 100%);
  --bubble-idol: rgba(10, 14, 24, 0.82);

  /* Typography: Crisp Pure White & Platinum */
  --text-main: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted: #8492a6;
  --text-faint: #475569;

  /* Geometry & Radius */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 26px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}'''

css = re.sub(r'/\* ==========================================================================\s*IDOLCHAT - Luxury Abyss Black[\s\S]*?--transition-smooth: 0\.35s cubic-bezier\(0\.16, 1, 0\.3, 1\);\s*}', crimson_tokens, css)

# Update Ambient Orbs for Warm Subtle Ruby / Charcoal reflections (No Cyberpunk neon)
ambient_crimson = '''.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  opacity: 0.35;
  will-change: transform;
  animation: floatOrb 20s ease-in-out infinite alternate;
}

.orb-1 {
  width: 650px;
  height: 650px;
  background: radial-gradient(circle, rgba(225, 29, 72, 0.16) 0%, rgba(3, 5, 8, 0) 70%);
  top: -140px;
  left: -100px;
  animation-duration: 22s;
}

.orb-2 {
  width: 580px;
  height: 580px;
  background: radial-gradient(circle, rgba(159, 18, 57, 0.14) 0%, rgba(3, 5, 8, 0) 70%);
  bottom: -100px;
  right: -80px;
  animation-duration: 25s;
  animation-delay: -6s;
}

.orb-3 {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(244, 63, 94, 0.08) 0%, rgba(3, 5, 8, 0) 70%);
  top: 35%;
  right: 12%;
  animation-duration: 28s;
  animation-delay: -12s;
}

.orb-4 {
  width: 440px;
  height: 440px;
  background: radial-gradient(circle, rgba(225, 29, 72, 0.10) 0%, rgba(3, 5, 8, 0) 70%);
  bottom: 18%;
  left: 18%;
  animation-duration: 24s;
  animation-delay: -8s;
}'''

css = re.sub(r'\.ambient-orb\s*\{[\s\S]*?animation-delay: -8s;\s*\}', ambient_crimson, css)

# Update Brand Logo
new_brand_logo = '''.brand-logo {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff1744 0%, #e11d48 50%, #9f1239 100%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  color: #fff;
  box-shadow: 0 0 20px rgba(225, 29, 72, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.45);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.brand-logo:hover {
  transform: scale(1.06);
  box-shadow: 0 0 26px rgba(255, 23, 68, 0.8), inset 0 1px 0 #ffffff;
}'''

css = re.sub(r'\.brand-logo\s*\{[\s\S]*?box-shadow: 0 0 20px rgba\(99, 102, 241, 0\.45\), inset 0 1px 0 rgba\(255, 255, 255, 0\.35\);\s*\}', new_brand_logo, css)

# Update Story Ring to MERAH GLOW (Crimson Ruby Glow)
new_story_ring = '''.story-ring-active {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  padding: 2.5px;
  border-radius: 25px;
  background: linear-gradient(135deg, #ff1744 0%, #e11d48 50%, #9f1239 100%);
  box-shadow: 0 0 16px rgba(225, 29, 72, 0.65), inset 0 0 8px rgba(255, 23, 68, 0.4);
  animation: storyRingPulse 2.5s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

@keyframes storyRingPulse {
  0%, 100% {
    box-shadow: 0 0 12px rgba(225, 29, 72, 0.55);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 22px rgba(255, 23, 68, 0.85);
    transform: scale(1.025);
  }
}'''

css = re.sub(r'\.story-ring-active\s*\{[\s\S]*?transform: scale\(1\.02\);\s*\}\s*\}', new_story_ring, css)

# Update Send Button with Crimson Red Glow
new_send_btn = '''.btn-send-message {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff1744 0%, #e11d48 50%, #9f1239 100%);
  border: 1px solid rgba(255, 255, 255, 0.45);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(225, 29, 72, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all var(--transition-fast);
}

.btn-send-message:hover {
  transform: scale(1.06);
  box-shadow: 0 0 28px rgba(255, 23, 68, 0.85), inset 0 1px 0 #ffffff;
  filter: brightness(1.15);
}'''

css = re.sub(r'\.btn-send-message\s*\{[\s\S]*?filter: brightness\(1\.15\);\s*\}', new_send_btn, css)

# Update lobby badge
css = re.sub(
    r'\.lobby-badge\s*\{[\s\S]*?text-transform: uppercase;\s*\}',
    '''.lobby-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  background: rgba(225, 29, 72, 0.14);
  color: #fda4af;
  border: 1px solid rgba(225, 29, 72, 0.35);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 15px rgba(225, 29, 72, 0.2);
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}''',
    css
)

# Update filter pills active
css = re.sub(
    r'\.filter-pill\.active\s*\{[\s\S]*?inset 0 1px 0 rgba\(255, 255, 255, 0\.35\);\s*\}',
    '''.filter-pill.active {
  background: linear-gradient(135deg, #ff1744 0%, #e11d48 100%);
  color: white;
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 16px rgba(225, 29, 72, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35);
}''',
    css
)

with open(CSS_PATH, "w", encoding="utf-8") as f:
    f.write(css)

print("SUCCESS: css/style.css updated with Crimson Red Glow & Ruby Luxury styling!")

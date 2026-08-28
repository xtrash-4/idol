import os
import re

CSS_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\css\style.css"
APP_PY = r"c:\Users\Hype\Desktop\IDOLCHAT\update_app_with_stories_and_avatar.py"

# 1. Update css/style.css with Abyss Black Theme
with open(CSS_PATH, "r", encoding="utf-8") as f:
    css = f.read()

abyss_tokens = '''/* ==========================================================================
   IDOLCHAT - Luxury Abyss Black & Liquid Glass Design System
   Aesthetic: Pure Abyss Black (#030508), Crystal Refractions, Specular Hairline Rims
   ========================================================================== */

:root {
  /* Core Base Colors - True Abyss Black Void */
  --bg-deep: #030508;
  --bg-surface: #070a10;
  --bg-card: rgba(10, 15, 26, 0.72);
  --bg-card-hover: rgba(16, 24, 42, 0.90);
  --bg-card-solid: #090e18;
  --bg-input: rgba(10, 15, 26, 0.85);

  /* High-Definition Liquid Glass Tokens (Abyss Black Edition) */
  --glass-surface: rgba(10, 15, 26, 0.75);
  --glass-surface-subtle: rgba(255, 255, 255, 0.04);
  --glass-surface-hover: rgba(18, 26, 44, 0.88);
  --glass-border: rgba(255, 255, 255, 0.14);
  --glass-border-bright: rgba(255, 255, 255, 0.32);
  --glass-border-focus: rgba(56, 189, 248, 0.8);
  --glass-specular: inset 0 1px 0 0 rgba(255, 255, 255, 0.38), inset 0 -1px 0 0 rgba(0, 0, 0, 0.45);
  --glass-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08);
  --glass-shadow-hover: 0 24px 60px -8px rgba(0, 0, 0, 0.95), 0 0 28px rgba(56, 189, 248, 0.2);
  --glass-blur: blur(32px) saturate(210%);

  /* Abyss Black & Electric Ice Accents */
  --accent-primary: #38bdf8;
  --accent-primary-hover: #7dd3fc;
  --accent-violet: #818cf8;
  --accent-cyan: #38bdf8;
  --accent-rose: #f43f5e;
  --accent-gold: #fbbf24;
  --accent-jkt48: #f43f5e;
  --accent-newjeans: #38bdf8;

  --accent-gradient: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 50%, #64748b 100%);
  --accent-gradient-btn: linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%);
  --accent-silver-btn-active: linear-gradient(135deg, #38bdf8 0%, #6366f1 100%);
  --accent-glow: rgba(56, 189, 248, 0.3);

  /* Chat Bubbles: Liquid Glass & Deep Obsidian */
  --bubble-user: linear-gradient(135deg, rgba(30, 41, 59, 0.92) 0%, rgba(15, 23, 42, 0.96) 100%);
  --bubble-idol: rgba(10, 16, 28, 0.82);

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

css = re.sub(r'/\* ==========================================================================\s*IDOLCHAT - Luxury Silver[\s\S]*?--transition-smooth: 0\.35s cubic-bezier\(0\.16, 1, 0\.3, 1\);\s*}', abyss_tokens, css)

# Update Ambient Orbs for Subtle Abyss Nebula
ambient_abyss = '''.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.45;
  will-change: transform;
  animation: floatOrb 20s ease-in-out infinite alternate;
}

.orb-1 {
  width: 650px;
  height: 650px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(3, 5, 8, 0) 70%);
  top: -140px;
  left: -100px;
  animation-duration: 22s;
}

.orb-2 {
  width: 580px;
  height: 580px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, rgba(3, 5, 8, 0) 70%);
  bottom: -100px;
  right: -80px;
  animation-duration: 25s;
  animation-delay: -6s;
}

.orb-3 {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.10) 0%, rgba(3, 5, 8, 0) 70%);
  top: 35%;
  right: 12%;
  animation-duration: 28s;
  animation-delay: -12s;
}

.orb-4 {
  width: 440px;
  height: 440px;
  background: radial-gradient(circle, rgba(244, 63, 94, 0.09) 0%, rgba(3, 5, 8, 0) 70%);
  bottom: 18%;
  left: 18%;
  animation-duration: 24s;
  animation-delay: -8s;
}'''

css = re.sub(r'\.ambient-orb\s*\{[\s\S]*?animation-delay: -8s;\s*\}', ambient_abyss, css)

# Update button send message with electric gradient glow
btn_send_abyss = '''.btn-send-message {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #38bdf8 0%, #6366f1 100%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all var(--transition-fast);
}

.btn-send-message:hover {
  transform: scale(1.06);
  box-shadow: 0 0 28px rgba(56, 189, 248, 0.75), inset 0 1px 0 #ffffff;
  filter: brightness(1.15);
}'''

css = re.sub(r'\.btn-send-message\s*\{[\s\S]*?filter: brightness\(1\.1\);\s*\}', btn_send_abyss, css)

with open(CSS_PATH, "w", encoding="utf-8") as f:
    f.write(css)

print("SUCCESS: css/style.css updated with Abyss Black Liquid Glass theme!")

# 2. Update update_app_with_stories_and_avatar.py to remove user initial and sender name
with open(APP_PY, "r", encoding="utf-8") as f:
    app_py_code = f.read()

# Update appendMessageToUI: No user name floating above user bubbles (Clean WhatsApp style)
old_msg_group = '''      // User avatar adalah polos inisial huruf "P"
      const avatarHtml = isUser
        ? `<div class="user-initial-avatar">P</div>`
        : `<img src="${activeMember.avatar}" alt="Avatar" class="group-avatar">`;

      targetGroup.innerHTML = `
        ${avatarHtml}
        <div class="group-content">
          <span class="group-sender-name">${isUser ? userName : (activeMember.nickname || activeMember.name)}</span>
          <div class="group-bubbles"></div>
          <span class="group-time">${msg.time || getCurrentTime()}</span>
        </div>
      `;'''

new_msg_group = '''      const avatarHtml = isUser
        ? ``
        : `<img src="${activeMember.avatar}" alt="Avatar" class="group-avatar">`;

      const senderNameHtml = isUser
        ? ``
        : `<span class="group-sender-name">${escapeHtml(activeMember.nickname || activeMember.name)}</span>`;

      targetGroup.innerHTML = `
        ${avatarHtml}
        <div class="group-content">
          ${senderNameHtml}
          <div class="group-bubbles"></div>
          <span class="group-time">${msg.time || getCurrentTime()}</span>
        </div>
      `;'''

if old_msg_group in app_py_code:
    app_py_code = app_py_code.replace(old_msg_group, new_msg_group)
    with open(APP_PY, "w", encoding="utf-8") as f:
        f.write(app_py_code)
    print("SUCCESS: update_app_with_stories_and_avatar.py updated to clean WhatsApp bubble style!")
else:
    print("Notice: msg_group pattern already clean or different.")

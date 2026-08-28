import os

CSS_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\css\style.css"

with open(CSS_PATH, "r", encoding="utf-8") as f:
    css_content = f.read()

# Let's inspect and replace the color variables and glass styling
new_tokens = '''/* ==========================================================================
   IDOLCHAT - Luxury Silver Elegant & High-Definition Liquid Glass Design System
   Aesthetic: Platinum Silver, Liquid Frost Glassmorphism, Specular Refractions
   ========================================================================== */

:root {
  /* Core Base Colors - Deep Obsidian & Platinum */
  --bg-deep: #080a0f;
  --bg-surface: #0e1219;
  --bg-card: rgba(18, 24, 38, 0.65);
  --bg-card-hover: rgba(28, 38, 60, 0.85);
  --bg-card-solid: #121724;
  --bg-input: rgba(18, 24, 40, 0.75);

  /* High-Definition Liquid Glass Tokens (Crisp Refractions & Specular Rings) */
  --glass-surface: rgba(20, 26, 42, 0.68);
  --glass-surface-subtle: rgba(255, 255, 255, 0.06);
  --glass-surface-hover: rgba(34, 44, 70, 0.85);
  --glass-border: rgba(226, 232, 240, 0.22);
  --glass-border-bright: rgba(255, 255, 255, 0.38);
  --glass-border-focus: rgba(203, 213, 225, 0.9);
  --glass-specular: inset 0 1px 0 0 rgba(255, 255, 255, 0.48), inset 0 -1px 0 0 rgba(0, 0, 0, 0.35);
  --glass-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.12);
  --glass-shadow-hover: 0 20px 48px -6px rgba(0, 0, 0, 0.75), 0 0 24px rgba(226, 232, 240, 0.25);
  --glass-blur: blur(28px) saturate(190%);

  /* Silver Elegant Palette */
  --silver-glow: rgba(226, 232, 240, 0.35);
  --silver-highlight: #ffffff;
  --silver-mid: #cbd5e1;
  --silver-dark: #64748b;
  --accent-primary: #94a3b8;
  --accent-primary-hover: #e2e8f0;
  --accent-violet: #8b5cf6;
  --accent-cyan: #38bdf8;
  --accent-rose: #f43f5e;
  --accent-gold: #fbbf24;
  --accent-jkt48: #f43f5e;
  --accent-newjeans: #38bdf8;

  --accent-gradient: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
  --accent-gradient-btn: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(203, 213, 225, 0.12) 100%);
  --accent-silver-btn-active: linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #94a3b8 100%);
  --accent-glow: rgba(226, 232, 240, 0.3);

  /* Chat Bubbles: Liquid Glass & Silver Refractions */
  --bubble-user: linear-gradient(135deg, rgba(100, 116, 139, 0.88) 0%, rgba(71, 85, 105, 0.94) 100%);
  --bubble-idol: rgba(18, 24, 40, 0.78);

  /* Typography: Crisp Metallic Platinum */
  --text-main: #f8fafc;
  --text-secondary: #e2e8f0;
  --text-muted: #94a3b8;
  --text-faint: #64748b;

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

# Replace from :root { to transition-smooth: ... }
import re
css_content = re.sub(r'/\* ==========================================================================\s*IDOLCHAT - Design System[\s\S]*?--transition-smooth: 0\.35s cubic-bezier\(0\.16, 1, 0\.3, 1\);\s*}', new_tokens, css_content)

# Update Ambient Orbs for Silver Refractions
ambient_replacement = '''.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(105px);
  opacity: 0.5;
  will-change: transform;
  animation: floatOrb 20s ease-in-out infinite alternate;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(226, 232, 240, 0.18) 0%, rgba(148, 163, 184, 0) 70%);
  top: -120px;
  left: -80px;
  animation-duration: 22s;
}

.orb-2 {
  width: 540px;
  height: 540px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0) 70%);
  bottom: -90px;
  right: -70px;
  animation-duration: 25s;
  animation-delay: -6s;
}

.orb-3 {
  width: 460px;
  height: 460px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(56, 189, 248, 0) 70%);
  top: 35%;
  right: 12%;
  animation-duration: 28s;
  animation-delay: -12s;
}

.orb-4 {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, rgba(244, 63, 94, 0) 70%);
  bottom: 18%;
  left: 18%;
  animation-duration: 24s;
  animation-delay: -8s;
}'''

css_content = re.sub(r'\.ambient-orb\s*\{[\s\S]*?animation-delay: -8s;\s*\}', ambient_replacement, css_content)

# Update button and active elements
css_content = css_content.replace(
    'background: var(--accent-gradient-btn);',
    'background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(203, 213, 225, 0.1) 100%); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.28); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4);'
)

with open(CSS_PATH, "w", encoding="utf-8") as f:
    f.write(css_content)

print("SUCCESS: Silver Elegant & Liquid Glass tokens applied to css/style.css!")

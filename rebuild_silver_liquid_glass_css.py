import os
import re

CSS_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\css\style.css"

with open(CSS_PATH, "r", encoding="utf-8") as f:
    css = f.read()

# 1. Refine Lobby Card Styling
old_card_pattern = r"\.lobby-card\s*\{[\s\S]*?cursor: pointer;\s*\}"
new_card = '''.lobby-card {
  background: rgba(16, 22, 36, 0.65);
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: var(--radius-lg);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  transition: all var(--transition-smooth);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.lobby-card:hover {
  background: rgba(24, 32, 52, 0.85);
  border-color: rgba(255, 255, 255, 0.45);
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 0 24px rgba(226, 232, 240, 0.25);
}'''

if re.search(old_card_pattern, css):
    css = re.sub(old_card_pattern, new_card, css)

# 2. Refine Chat Header & Actions
old_header_pattern = r"\.chat-header\s*\{[\s\S]*?z-index: 20;\s*\}"
new_header = '''.chat-header {
  height: 72px;
  padding: 0 24px;
  background: rgba(12, 16, 26, 0.78);
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.22);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
}'''

if re.search(old_header_pattern, css):
    css = re.sub(old_header_pattern, new_header, css)

# 3. Refine Chat Input Container & Form
old_input_pattern = r"\.chat-input-container\s*\{[\s\S]*?z-index: 20;\s*\}"
new_input = '''.chat-input-container {
  padding: 12px 24px 20px 24px;
  background: rgba(8, 11, 18, 0.92);
  backdrop-filter: blur(30px) saturate(190%);
  -webkit-backdrop-filter: blur(30px) saturate(190%);
  border-top: 1px solid rgba(226, 232, 240, 0.18);
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 20;
}'''

if re.search(old_input_pattern, css):
    css = re.sub(old_input_pattern, new_input, css)

# 4. Refine Send Button
old_send_pattern = r"\.btn-send-message\s*\{[\s\S]*?transition: all var\(--transition-fast\);\s*\}"
new_send = '''.btn-send-message {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #080a0f;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(226, 232, 240, 0.4), inset 0 1px 0 #ffffff;
  transition: all var(--transition-fast);
}

.btn-send-message:hover {
  transform: scale(1.06);
  box-shadow: 0 0 22px rgba(255, 255, 255, 0.6), inset 0 1px 0 #ffffff;
  filter: brightness(1.1);
}'''

if re.search(old_send_pattern, css):
    css = re.sub(old_send_pattern, new_send, css)

# 5. Clean up btn-lobby-chat-start
old_btn_lobby = r"\.btn-lobby-chat-start\s*\{[\s\S]*?filter: brightness\(1\.08\);\s*\}"
new_btn_lobby = '''.btn-lobby-chat-start {
  width: 100%;
  padding: 10px 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(203, 213, 225, 0.1) 100%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.32);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.45);
  color: white;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all var(--transition-fast);
}

.btn-lobby-chat-start:hover {
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  color: #080a0f;
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 6px 22px rgba(226, 232, 240, 0.45), inset 0 1px 0 #ffffff;
  transform: translateY(-2px);
}'''

if re.search(old_btn_lobby, css):
    css = re.sub(old_btn_lobby, new_btn_lobby, css)

with open(CSS_PATH, "w", encoding="utf-8") as f:
    f.write(css)

print("SUCCESS: Full Silver Elegant & Liquid Glass design applied cleanly to css/style.css!")

import os

CSS_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\css\style.css"

with open(CSS_PATH, "r", encoding="utf-8") as f:
    css = f.read()

# Let's replace from .lobby-hero { down to .group-tab-btn:hover .group-tab-logo {
target_block = '''/* Lobby Hero */
.lobby-hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 10px 0 4px 0;
}

.lobby-badge {
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
}

.lobby-hero h2 {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 60%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lobby-hero p {
  color: var(--text-muted);
  font-size: 14px;
  max-width: 540px;
}

/* Group Switcher Tabs (Sticky Liquid Glass Capsule) */
.lobby-group-switch-wrapper {
  margin-top: 6px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.group-switcher-tabs {
  display: inline-flex;
  gap: 10px;
  background: rgba(13, 16, 28, 0.75);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  padding: 6px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.group-tab-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 22px;
  border-radius: var(--radius-md);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-smooth);
  color: var(--text-muted);
}

.group-tab-logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  transition: all var(--transition-fast);
}

.group-tab-logo.jkt48 {
  border: 1.5px solid rgba(244, 63, 94, 0.45);
  box-shadow: 0 0 16px rgba(244, 63, 94, 0.3);
}

.group-tab-logo.newjeans {
  border: 1.5px solid rgba(6, 182, 212, 0.45);
  box-shadow: 0 0 16px rgba(6, 182, 212, 0.3);
}

.group-tab-btn:hover .group-tab-logo {'''

import re
css = re.sub(r'/\* Lobby Hero \*/[\s\S]*?\.group-tab-btn:hover \.group-tab-logo \{', target_block, css)

with open(CSS_PATH, "w", encoding="utf-8") as f:
    f.write(css)

print("SUCCESS: Clean CSS written for lobby hero and group switcher tabs!")

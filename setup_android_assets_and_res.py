import os
import shutil

base_dir = r"c:\Users\Hype\Desktop\IDOLCHAT"
android_dir = os.path.join(base_dir, "android")
app_src_main = os.path.join(android_dir, "app", "src", "main")
assets_dir = os.path.join(app_src_main, "assets")
res_values_dir = os.path.join(app_src_main, "res", "values")

os.makedirs(assets_dir, exist_ok=True)
os.makedirs(res_values_dir, exist_ok=True)

# 1. Strings.xml
with open(os.path.join(res_values_dir, "strings.xml"), "w", encoding="utf-8") as f:
    f.write('''<resources>
    <string name="app_name">MPRUYY HALU</string>
</resources>
''')

# 2. Colors.xml
with open(os.path.join(res_values_dir, "colors.xml"), "w", encoding="utf-8") as f:
    f.write('''<resources>
    <color name="bg_dark">#030508</color>
</resources>
''')

# 3. Themes.xml
with open(os.path.join(res_values_dir, "themes.xml"), "w", encoding="utf-8") as f:
    f.write('''<resources>
    <style name="Theme.MpruyyHalu" parent="android:Theme.NoTitleBar.Fullscreen">
        <item name="android:windowBackground">@color/bg_dark</item>
    </style>
</resources>
''')

# 4. Copy Web Assets to android assets
items_to_copy = ["index.html", "manifest.json", "sw.js", "jkt48 logo.jpg", "newjeans logo.jpg"]
for item in items_to_copy:
    src = os.path.join(base_dir, item)
    dst = os.path.join(assets_dir, item)
    if os.path.exists(src):
        shutil.copy2(src, dst)

dirs_to_copy = ["css", "js", "member_photos", "audio"]
for d in dirs_to_copy:
    src = os.path.join(base_dir, d)
    dst = os.path.join(assets_dir, d)
    if os.path.exists(src):
        if os.path.exists(dst):
            shutil.rmtree(dst)
        shutil.copytree(src, dst)

print("SUCCESS: Android resources and web assets copied to assets folder successfully!")

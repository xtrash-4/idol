import os
import re

BASE_DIR = r"c:\Users\Hype\Desktop\IDOLCHAT"
MANIFEST_PATH = os.path.join(BASE_DIR, "android", "app", "src", "main", "AndroidManifest.xml")
JAVA_PATH = os.path.join(BASE_DIR, "android", "app", "src", "main", "java", "com", "mpruyy", "idolchat", "MainActivity.java")
HTML_PATH = os.path.join(BASE_DIR, "index.html")
CSS_PATH = os.path.join(BASE_DIR, "css", "style.css")
APP_PY_PATH = os.path.join(BASE_DIR, "update_app_with_stories_and_avatar.py")

# ==============================================================================
# 1. Update AndroidManifest.xml for adjustResize
# ==============================================================================
manifest_content = '''<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Internet & Network Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@android:drawable/sym_def_app_icon"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.MpruyyHalu"
        android:hardwareAccelerated="true"
        android:usesCleartextTraffic="true">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="adjustResize"
            android:configChanges="orientation|screenSize|keyboardHidden|keyboard">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
'''
with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
    f.write(manifest_content)
print("SUCCESS: AndroidManifest.xml updated with windowSoftInputMode='adjustResize'!")

# ==============================================================================
# 2. Update MainActivity.java with AndroidBug5497Workaround
# ==============================================================================
java_content = '''package com.mpruyy.idolchat;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Rect;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

public class MainActivity extends Activity {

    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Adjust resize when soft keyboard opens
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);

        // Immersive Fullscreen Dark View
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        );

        webView = new WebView(this);
        
        // 60FPS Hardware Acceleration & Anti-Wobble
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setVerticalScrollBarEnabled(false);

        setContentView(webView);

        // Assist keyboard resize for fullscreen layout
        AndroidBug5497Workaround.assistActivity(this);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        webSettings.setEnableSmoothTransition(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUserAgentString(webSettings.getUserAgentString() + " MpruyyHaluApp/1.0");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return false;
            }
        });

        webView.setWebChromeClient(new WebChromeClient());

        // Load local asset index
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    // Helper for keyboard resizing in fullscreen Android activities
    public static class AndroidBug5497Workaround {
        public static void assistActivity(Activity activity) {
            new AndroidBug5497Workaround(activity);
        }

        private View mChildOfContent;
        private int usableHeightPrevious;
        private ViewGroup.LayoutParams frameLayoutParams;

        private AndroidBug5497Workaround(Activity activity) {
            FrameLayout content = (FrameLayout) activity.findViewById(android.R.id.content);
            mChildOfContent = content.getChildAt(0);
            if (mChildOfContent != null) {
                mChildOfContent.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
                    public void onGlobalLayout() {
                        possiblyResizeChildOfContent();
                    }
                });
                frameLayoutParams = mChildOfContent.getLayoutParams();
            }
        }

        private void possiblyResizeChildOfContent() {
            int usableHeightNow = computeUsableHeight();
            if (usableHeightNow != usableHeightPrevious && frameLayoutParams != null) {
                int usableHeightSansKeyboard = mChildOfContent.getRootView().getHeight();
                int heightDifference = usableHeightSansKeyboard - usableHeightNow;
                if (heightDifference > (usableHeightSansKeyboard / 4)) {
                    // keyboard probably showing
                    frameLayoutParams.height = usableHeightSansKeyboard - heightDifference;
                } else {
                    // keyboard probably hidden
                    frameLayoutParams.height = ViewGroup.LayoutParams.MATCH_PARENT;
                }
                mChildOfContent.requestLayout();
                usableHeightPrevious = usableHeightNow;
            }
        }

        private int computeUsableHeight() {
            Rect r = new Rect();
            mChildOfContent.getWindowVisibleDisplayFrame(r);
            return (r.bottom - r.top);
        }
    }
}
'''
with open(JAVA_PATH, "w", encoding="utf-8") as f:
    f.write(java_content)
print("SUCCESS: MainActivity.java updated with AndroidBug5497Workaround!")

# ==============================================================================
# 3. Update index.html viewport meta
# ==============================================================================
with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

html = re.sub(
    r'<meta name="viewport" content="[^"]*">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, interactive-widget=resizes-content, viewport-fit=cover">',
    html
)
with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)
print("SUCCESS: index.html updated with interactive-widget=resizes-content!")

# ==============================================================================
# 4. Update css/style.css with 100% Anti-Wobble and Mobile Keyboard Fix
# ==============================================================================
with open(CSS_PATH, "r", encoding="utf-8") as f:
    css = f.read()

# Make sure html and body are completely fixed and anti-wobble
html_body_replacement = '''* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

html {
  width: 100%;
  max-width: 100vw;
  height: 100%;
  overflow-x: hidden !important;
  overscroll-behavior-x: none;
  -webkit-overflow-scrolling: touch;
}

body {
  background-color: var(--bg-deep);
  background-image: 
    radial-gradient(circle at 15% 10%, rgba(225, 29, 72, 0.08) 0%, transparent 45%),
    radial-gradient(circle at 85% 90%, rgba(159, 18, 57, 0.06) 0%, transparent 45%);
  background-attachment: fixed;
  color: var(--text-main);
  height: 100dvh;
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
}'''

css = re.sub(r'\*\s*\{[\s\S]*?body\s*\{[\s\S]*?flex-direction: column;\s*\}', html_body_replacement, css)

# Make sure .lobby-view and .chat-layout are 100dvh/fixed
view_replacement = '''.lobby-view {
  position: absolute;
  inset: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden !important;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  z-index: 50;
  display: flex;
  flex-direction: column;
}

.chat-layout {
  position: absolute;
  inset: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 60;
  display: flex;
  flex-direction: column;
}

.chat-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;
}

.chat-messages-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  padding: 16px 20px 20px 20px;
}

.chat-input-container {
  flex-shrink: 0;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  background: rgba(8, 11, 18, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid var(--glass-border);
  padding: 8px 16px max(12px, env(safe-area-inset-bottom)) 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}'''

# Replace view definitions
css = re.sub(r'\.lobby-view\s*\{[\s\S]*?\.chat-input-container\s*\{[\s\S]*?gap: 8px;\s*\}', view_replacement, css)

# Make sure on mobile max-width: 100% and no horizontal shifts
mobile_fixes = '''@media (max-width: 768px) {
  /* 1. LOBBY SCREEN (Bagian Pertama) */
  .lobby-container {
    padding: 10px 8px 70px 8px;
    gap: 10px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden !important;
  }

  .lobby-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 8px 10px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .brand-badge {
    gap: 8px;
  }

  .brand-logo {
    width: 36px;
    height: 36px;
    font-size: 15px;
    border-radius: 10px;
  }

  .brand-info h1 {
    font-size: 15px;
    letter-spacing: -0.2px;
  }

  .brand-info p {
    display: none;
  }

  .lobby-top-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .lobby-action-btn, .btn-lobby-action {
    padding: 6px 10px;
    font-size: 11px;
    border-radius: 10px;
  }

  .lobby-hero {
    margin: 2px 0 6px 0;
    text-align: center;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 4px;
  }

  .lobby-hero h2 {
    font-size: 18px;
    font-weight: 800;
  }

  .lobby-hero p {
    font-size: 11.5px;
    line-height: 1.35;
  }

  .lobby-group-switch-wrapper {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 4px 0 8px 0;
  }

  .group-switcher-tabs {
    width: 100%;
    max-width: 100%;
    gap: 6px;
    padding: 4px;
    box-sizing: border-box;
  }

  .group-tab-btn {
    flex: 1;
    padding: 6px 8px;
    gap: 6px;
    border-radius: 10px;
    min-width: 0;
    box-sizing: border-box;
  }

  .group-tab-logo {
    width: 26px;
    height: 26px;
    border-radius: 6px;
  }

  .group-tab-name {
    font-size: 12px;
  }

  .group-tab-desc {
    font-size: 9.5px;
  }

  .lobby-controls {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    gap: 6px;
  }

  .lobby-search-box {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 6px 10px;
    border-radius: 12px;
  }

  .lobby-search-box input {
    font-size: 12px;
  }

  .lobby-filter-pills {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    touch-action: pan-x;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    gap: 5px;
    padding: 2px 0 4px 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    flex-wrap: nowrap;
  }

  .lobby-filter-pills::-webkit-scrollbar {
    display: none;
  }

  .filter-pill {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 4px 10px;
    font-size: 10.5px;
    border-radius: 9999px;
  }

  /* 2-COLUMN MEMBER GRID ON MOBILE (ANTI-OVERFLOW) */
  .lobby-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .lobby-card {
    padding: 10px 6px 8px 6px;
    border-radius: 14px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .lobby-card-avatar-wrap {
    width: 68px;
    height: 68px;
    min-width: 68px;
    min-height: 68px;
    margin: 0 auto 6px auto;
  }

  .lobby-card-avatar {
    border-radius: 14px;
  }

  .lobby-card-name {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .lobby-card-meta {
    gap: 2px;
    margin-bottom: 3px;
  }

  .lobby-card-group-tag, .lobby-card-gen, .lobby-card-fandom {
    font-size: 8.5px;
    padding: 1px 4px;
  }

  .lobby-card-jiko {
    display: none;
  }

  .lobby-card-tags {
    gap: 2px;
    margin-bottom: 6px;
  }

  .lobby-tag {
    font-size: 8px;
    padding: 1px 4px;
  }

  .btn-lobby-chat-start {
    padding: 6px 8px;
    font-size: 11px;
    border-radius: 8px;
    gap: 4px;
  }

  /* 2. CHAT HEADER ON MOBILE */
  .chat-header {
    height: 56px;
    padding: 0 8px;
    gap: 6px;
    flex-shrink: 0;
  }

  .chat-header-left {
    gap: 6px;
    flex: 1;
    min-width: 0;
  }

  .btn-chat-back {
    width: 34px;
    height: 34px;
    min-width: 34px;
    padding: 0;
    justify-content: center;
    border-radius: 50%;
  }

  .btn-chat-back span {
    display: none;
  }

  .header-avatar-wrap {
    width: 34px;
    height: 34px;
    min-width: 34px;
  }

  .header-avatar {
    border-radius: 9px;
  }

  .header-details {
    min-width: 0;
    flex: 1;
  }

  .header-details h2 {
    font-size: 12.5px;
    font-weight: 700;
    gap: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
  }

  .header-details .member-badge {
    font-size: 8px;
    padding: 1px 4px;
  }

  .header-details p {
    font-size: 9.5px;
    margin-top: 0;
  }

  .chat-header-actions {
    gap: 4px;
    flex-shrink: 0;
  }

  .header-action-btn {
    width: 32px;
    height: 32px;
    min-width: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }

  .header-action-btn span {
    display: none;
  }

  .header-action-btn i {
    font-size: 13px;
    margin: 0;
  }

  /* 3. CHAT MESSAGES & BUBBLES */
  .chat-messages-container {
    padding: 8px 6px 12px 6px;
  }

  .welcome-banner {
    padding: 10px 8px;
    margin-bottom: 12px;
    border-radius: 12px;
  }

  .welcome-banner h3 {
    font-size: 13px;
  }

  .welcome-banner p {
    font-size: 10.5px;
  }

  .group-avatar {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }

  .group-content {
    max-width: 84%;
  }

  .bubble {
    font-size: 12.5px;
    padding: 7px 11px;
  }

  .pap-card {
    max-width: 200px;
  }

  /* 4. QUICK SUGGESTION CHIPS (Horizontal Scrollable) */
  .quick-prompts-bar {
    display: flex;
    gap: 5px;
    overflow-x: auto;
    overflow-y: hidden;
    touch-action: pan-x;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding: 4px 6px;
    flex-wrap: nowrap;
    flex-shrink: 0;
  }

  .quick-prompts-bar::-webkit-scrollbar {
    display: none;
  }

  .quick-chip {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 5px 10px;
    font-size: 11px;
    border-radius: 9999px;
  }

  /* 5. CHAT INPUT BAR (KEYBOARD RESIZE FRIENDLY) */
  .chat-input-container {
    padding: 4px 6px max(8px, env(safe-area-inset-bottom)) 6px;
    background: rgba(7, 9, 16, 0.98);
    backdrop-filter: blur(20px);
    gap: 4px;
    flex-shrink: 0;
  }

  .chat-input-form {
    padding: 3px 5px 3px 8px;
    min-height: 38px;
    border-radius: 20px;
    gap: 4px;
  }

  .input-tool-btn {
    padding: 4px;
    font-size: 14px;
  }

  .chat-textarea {
    font-size: 13px;
    padding: 4px 0;
    line-height: 1.3;
    max-height: 80px;
  }

  .btn-send-message {
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    font-size: 12px;
  }

  /* 6. DRAWER & STORY PLAYER */
  .profile-drawer {
    width: 100vw;
  }

  .story-player-card {
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
}'''

# Replace mobile media query in css
css = re.sub(r'@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*', mobile_fixes, css)

with open(CSS_PATH, "w", encoding="utf-8") as f:
    f.write(css)
print("SUCCESS: css/style.css updated with anti-wobble and keyboard adjustment styling!")

# ==============================================================================
# 5. Update update_app_with_stories_and_avatar.py for focus scroll
# ==============================================================================
with open(APP_PY_PATH, "r", encoding="utf-8") as f:
    app_code = f.read()

# Add focus listener to scroll to bottom when keyboard opens
focus_code = '''    // Focus scroll for mobile keyboard
    chatInputEl.addEventListener("focus", () => {
      setTimeout(() => {
        scrollToBottom();
        chatInputEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 250);
    });'''

if "chatInputEl.addEventListener(\"focus\"" not in app_code:
    app_code = app_code.replace(
        'chatInputEl.addEventListener("keydown", (e) => {',
        focus_code + '\n\n    chatInputEl.addEventListener("keydown", (e) => {'
    )
    with open(APP_PY_PATH, "w", encoding="utf-8") as f:
        f.write(app_code)
    print("SUCCESS: update_app_with_stories_and_avatar.py updated with focus scroll!")

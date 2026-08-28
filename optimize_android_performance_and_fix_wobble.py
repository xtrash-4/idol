import os
import re

CSS_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\css\style.css"
HTML_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\index.html"
JAVA_PATH = r"c:\Users\Hype\Desktop\IDOLCHAT\android\app\src\main\java\com\mpruyy\idolchat\MainActivity.java"

# 1. Update css/style.css
with open(CSS_PATH, "r", encoding="utf-8") as f:
    css = f.read()

# Anti-Wobble & Performance Body & Root
body_optimization = '''html {
  width: 100%;
  max-width: 100vw;
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
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden !important;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  overscroll-behavior-x: none;
  touch-action: pan-y;
  display: flex;
  flex-direction: column;
  position: relative;
}

.ambient-canvas {
  display: none !important; /* Disabled for ultra-smooth 60FPS mobile performance */
}'''

css = re.sub(r'body\s*\{[\s\S]*?\.ambient-canvas\s*\{[\s\S]*?overflow: hidden;\s*\}', body_optimization, css)

# Optimize story-ring-active (Static GPU-accelerated Merah Glow without heavy 60fps repaints)
story_ring_opt = '''.story-ring-active {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  padding: 2.5px;
  border-radius: 25px;
  background: linear-gradient(135deg, #ff1744 0%, #e11d48 50%, #9f1239 100%);
  box-shadow: 0 0 14px rgba(225, 29, 72, 0.6), inset 0 0 6px rgba(255, 23, 68, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}'''

css = re.sub(r'\.story-ring-active\s*\{[\s\S]*?@keyframes storyRingPulse\s*\{[\s\S]*?\}\s*\}', story_ring_opt, css)

# Make sure all containers have 100% max-width and box-sizing to prevent horizontal spill
container_fixes = '''/* Anti-Horizontal Scroll Rules */
.lobby-view, .lobby-container, .chat-layout, .chat-view, .lobby-hero, .lobby-controls {
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden !important;
}

.lobby-group-switch-wrapper {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
}

.group-switcher-tabs {
  width: 100%;
  max-width: 480px;
  box-sizing: border-box;
  display: flex;
}

.lobby-filter-pills {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  touch-action: pan-x;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  gap: 6px;
  padding: 2px 0 6px 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  flex-wrap: nowrap;
}

.lobby-card {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}'''

if "/* Anti-Horizontal Scroll Rules */" not in css:
    css = css + "\n\n" + container_fixes

with open(CSS_PATH, "w", encoding="utf-8") as f:
    f.write(css)

print("SUCCESS: css/style.css updated with anti-wobble and 60FPS mobile performance!")

# 2. Update Android MainActivity.java for Hardware Acceleration & Smooth Scroll
java_content = '''package com.mpruyy.idolchat;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Immersive Fullscreen Dark View
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        );

        webView = new WebView(this);
        
        // 60FPS Hardware Acceleration & Anti-Wobble
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setVerticalScrollBarEnabled(false);

        setContentView(webView);

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
}
'''

with open(JAVA_PATH, "w", encoding="utf-8") as f:
    f.write(java_content)

print("SUCCESS: MainActivity.java updated with Hardware Acceleration and Anti-Wobble settings!")

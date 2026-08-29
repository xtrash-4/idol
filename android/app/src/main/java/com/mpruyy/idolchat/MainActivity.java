package com.mpruyy.idolchat;

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

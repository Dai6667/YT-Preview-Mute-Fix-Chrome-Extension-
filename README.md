# YT Preview Mute Fix (Chrome Extension)

This extension forces YouTube hover/thumbnail preview videos to be muted, while trying not to affect the main player on watch pages.

## Install (Developer Mode)

1. Open Chrome and go to chrome://extensions
2. Enable Developer mode
3. Click Load unpacked
4. Select this folder: E:\\chrome_YT

## Notes

- YouTube is a single-page app, so the extension uses a MutationObserver to catch videos that are injected after navigation.
- If you notice the main player getting muted in a specific layout/experiment, tell me what URL/page type it happens on and we can refine the main player detection.

# YT 預覽靜音修正 (Chrome 擴充功能)

此擴充功能會強制將 YouTube 的懸停/縮圖預覽影片靜音，同時盡可能不影響觀看頁面上的主播放器。

## 安裝說明 (開發人員模式)

1. 開啟 Chrome 並前往 `chrome://extensions`
2. 啟用右上角的「開發人員模式」
3. 點擊左上角的「載入未封裝項目」
4. 選擇此資料夾：`E:\chrome_YT`

## 注意事項

- YouTube 是一個單頁面應用程式 (SPA)，因此擴充功能使用了 `MutationObserver` 來捕捉在頁面導覽後才動態注入的影片。
- 如果您發現主播放器在特定的版面配置或實驗性功能中也被靜音了，請告訴我是發生在哪個網址或頁面類型上，我們再來改良對主播放器的偵測機制。

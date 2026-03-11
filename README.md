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
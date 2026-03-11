# Chrome Web Store Listing Draft

## One-line summary (short description)
Force-mute YouTube hover/thumbnail preview videos to prevent sudden loud audio.

## Detailed description
YouTube preview playback (hover over a video thumbnail) may sometimes play at maximum volume.
This extension forces thumbnail/hover preview videos to stay muted, while trying not to affect the main player on watch pages.

What it does:
- Automatically mutes preview/thumbnail videos across YouTube.
- Re-applies mute even after YouTube dynamically loads new thumbnails.

What it does not do:
- It does not collect data.
- It does not make external network requests.

## Permissions rationale
This extension injects a content script only on YouTube domains to control preview <video> elements.
No additional permissions are requested.

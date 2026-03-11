// YT Preview Mute Fix
// Goal: mute "hover/thumbnail preview" <video> elements that appear across YouTube,
// without muting the main player on a watch page.
(() => {
  const TAGGED = "data-ytpmf-bound";
  const observedRoots = new WeakSet();

  function isElement(node) {
    return !!node && node.nodeType === Node.ELEMENT_NODE;
  }

  function isMainPlayerVideo(video) {
    // Heuristics: YouTube main player video typically lives inside the html5 player DOM.
    // We try multiple containers to stay robust across layouts/experiments.
    if (!video || video.tagName !== "VIDEO") return false;

    // Classic watch player
    if (video.closest("#movie_player")) return true;
    if (video.closest(".html5-video-player")) return true;

    // Newer watch layouts / embedded player wrappers
    if (video.closest("ytd-player")) return true;
    if (video.closest("#player-container")) return true;
    if (video.closest("#player")) return true;

    // Extra guard: class names used by the main stream
    // (Not guaranteed, but helps avoid false positives.)
    if (video.classList.contains("html5-main-video")) return true;

    return false;
  }

  function forceMute(video) {
    // Some preview videos may fight back by unmuting or setting volume.
    // We set both muted + volume and re-apply on volumechange.
    try {
      video.muted = true;
      if (typeof video.volume === "number") video.volume = 0;
    } catch {
      // ignore
    }
  }

  function bindVideo(video) {
    if (!video || video.tagName !== "VIDEO") return;
    if (video.hasAttribute(TAGGED)) return;
    video.setAttribute(TAGGED, "1");

    // If it's the main player, do nothing.
    if (isMainPlayerVideo(video)) return;

    forceMute(video);

    // Enforce mute even if YT code changes it later.
    video.addEventListener(
      "volumechange",
      () => {
        if (isMainPlayerVideo(video)) return;
        forceMute(video);
      },
      { passive: true }
    );

    // A few preview implementations start playback later; keep it muted at play time.
    video.addEventListener(
      "play",
      () => {
        if (isMainPlayerVideo(video)) return;
        forceMute(video);
      },
      { passive: true }
    );
  }

  function scanRoot(root) {
    if (!root || !root.querySelectorAll) return;
    const videos = root.querySelectorAll("video");
    for (const v of videos) bindVideo(v);
  }

  function scanNode(node) {
    if (!node) return;

    // Direct video node
    if (node.tagName === "VIDEO") {
      bindVideo(node);
    }

    // Standard DOM subtree
    if (node.querySelectorAll) {
      scanRoot(node);
    }

    // Shadow DOM subtree
    if (node.shadowRoot) {
      scanRoot(node.shadowRoot);
      observeRoot(node.shadowRoot);
    }
  }

  function observeRoot(root) {
    if (!root || observedRoots.has(root)) return;
    observedRoots.add(root);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!node) continue;
          if (isElement(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            scanNode(node);
          }
        }
      }
    });

    observer.observe(root, { childList: true, subtree: true });
  }

  // Initial scan (best-effort; at document_start DOM may be empty).
  scanNode(document.documentElement);

  // Observe document and any shadow roots discovered later.
  observeRoot(document.documentElement);
})();
let enabled = true;

console.log("Boo!");
const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
].map((path) => chrome.runtime.getURL(path));

function spookify() {
    if (!enabled) return;
    document.querySelectorAll("yt-thumbnail-view-model img").forEach((img) => {
        if (img.src.startsWith("chrome-extension://")) return;

         img.dataset.originalSrc = img.src;
        const pick = images[Math.floor(Math.random() * images.length)];
        img.src = pick;
    })
}

function restore() {
    document.querySelectorAll("yt-thumbnail-view-model img").forEach((img) => {
        if (img.dataset.originalSrc) {
            img.src = img.dataset.originalSrc;
            delete img.dataset.originalSrc;
        }
    });
}
chrome.storage.local.get({ enabled: true }, (result) => {
    enabled = result.enabled;
    spookify();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local" || !changes.enabled) return;

  enabled = changes.enabled.newValue;

  if (enabled) {
    spookify();
  } else {
    restore();
  }
});

const observer = new MutationObserver(spookify);
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes:true,
    attributeFilter: ["src"],
})


let enabled = true;
const THUMB_SELECTOR = "yt-thumbnail-view-model img, ytd-thumbnail img";

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
    document.querySelectorAll(THUMB_SELECTOR).forEach((img) => {
        if (img.src.startsWith("chrome-extension://")) return;

        img.dataset.originalSrc = img.src;
        const pick = images[Math.floor(Math.random() * images.length)];
        img.src = pick;
        img.classList.add("ghost-thumb");
    });
}

function restore() {
    document.querySelectorAll(THUMB_SELECTOR).forEach((img) => {
        if (img.dataset.originalSrc) {
            img.src = img.dataset.originalSrc;
            delete img.dataset.originalSrc;
            img.classList.remove("ghost-thumb");
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
    attributes: true,
    attributeFilter: ["src"],
});
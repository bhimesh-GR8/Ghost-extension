console.log("Boo!");

const THUMB_SELECTOR = "yt-thumbnail-view-model img, ytd-thumbnail img";
const SETTING_DEFAULTS = { thumbnails: true, effects: true, vignette: true, scare: true };
let settings = { ...SETTING_DEFAULTS };

const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
].map((path) => chrome.runtime.getURL(path));

function applyRootClasses() {
    document.documentElement.classList.toggle("ghost-fx", settings.effects);
    document.documentElement.classList.toggle("ghost-vignette", settings.vignette);
}

function swapThumbnails() {
    if (!settings.thumbnails) return;

    document.querySelectorAll(THUMB_SELECTOR).forEach((img) => {
        if (img.src.startsWith("chrome-extension://")) return;

        img.dataset.originalSrc = img.src;
        const pick = images[Math.floor(Math.random() * images.length)];
        img.src = pick;
        img.classList.add("ghost-thumb");
    });
}

function restoreThumbnails() {
    document.querySelectorAll(THUMB_SELECTOR).forEach((img) => {
        if (img.dataset.originalSrc) {
            img.src = img.dataset.originalSrc;
            delete img.dataset.originalSrc;
            img.classList.remove("ghost-thumb");
        }
    });
}

function update() {
    applyRootClasses();
    if (settings.thumbnails) {
        swapThumbnails();
    } else {
        restoreThumbnails();
    }
}

chrome.storage.local.get(SETTING_DEFAULTS, (result) => {
    settings = result;
    update();
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;

    for (const key in changes) {
        if (!(key in SETTING_DEFAULTS)) continue;
        
        settings[key] = changes[key].newValue ?? SETTING_DEFAULTS[key];
    }
    update();
});


let scheduled = false;
function scheduleSwap() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => {
        scheduled = false;
        swapThumbnails();
    }, 100);
}

const observer = new MutationObserver(scheduleSwap);
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"],
});
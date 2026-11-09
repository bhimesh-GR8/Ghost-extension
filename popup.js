const DEFAULTS = { thumbnails: true, effects: true, vignette: true, scare: true };
const boxes = document.querySelectorAll("input[data-setting]");

function load() {
  chrome.storage.local.get(DEFAULTS, (result) => {
    boxes.forEach((box) => {
      box.checked = result[box.dataset.setting];
    });
  });
}

boxes.forEach((box) => {
  box.addEventListener("change", () => {
    chrome.storage.local.set({ [box.dataset.setting]: box.checked });
  });
});

document.getElementById("reset").addEventListener("click", () => {
  chrome.storage.local.clear(() => load());
});

load();
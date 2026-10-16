
const checkbox = document.getElementById("toggle");
chrome.storage.local.get("enabled", (result) => {
    checkbox.checked = result.enabled !== false;

});
checkbox.addEventListener("change", () => {
  chrome.storage.local.set({ enabled: checkbox.checked });
});

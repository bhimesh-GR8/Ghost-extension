
function jumpScare() {
  if (!document.body) return;


  if (document.visibilityState !== "visible") return;

    if (document.querySelector(".ghost-jumpscare")) return;

      const overlay = document.createElement("div");
      overlay.className = "ghost-jumpscare";

      const pic = document.createElement("img");
      pic.src = chrome.runtime.getURL("images/scare.jpg");

      overlay.append(pic);
      document.body.append(overlay);

  
      chrome.runtime.sendMessage({ type: "play-scare-sound" }).catch(() => {});

  
      overlay.addEventListener("click", () => overlay.remove());

  
  setTimeout(() => overlay.remove(), 2000);
}


chrome.storage.local.get({ scare: true }, (result) => {
  if (result.scare) jumpScare();
});
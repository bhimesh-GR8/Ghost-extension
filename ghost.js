(() => {
  const GHOST_COUNT = 5;
  let layer = null;


  const rand = (min, max) => min + Math.random() * (max - min);

  function build() {
    if (layer) return;

    layer = document.createElement("div");
    layer.id = "ghost-layer";


    for (let i = 0; i < GHOST_COUNT; i++) {
        const g = document.createElement("img");
        g.className = "ghost-float";
        g.src = chrome.runtime.getURL("images/ghost.png");
        g.alt = "";
        g.draggable = false;

        const dur = rand(28, 48);
        const leftToRight = Math.random() < 0.5;

        g.style.setProperty("--from", leftToRight ? "-15vw" : "115vw");
        g.style.setProperty("--to", leftToRight ? "115vw" : "-15vw");
        g.style.setProperty("--top", rand(5, 80).toFixed(1) + "vh");
        g.style.setProperty("--dur", dur.toFixed(1) + "s");
        g.style.setProperty("--delay", "-" + rand(0, dur).toFixed(1) + "s");
        g.style.setProperty("--op", rand(0.5, 0.8).toFixed(2));
        g.style.setProperty("--size", Math.round(rand(32, 72)) + "px");


        layer.append(g);
    }

    document.documentElement.append(layer);
  }

  function destroy() {
    if (layer) layer.remove ();
    layer = null;
  }

  function refresh() {
    chrome.storage.local.get({ ghosts: true, skipSites: [] }, (result) => {
        if (result.ghosts && !ghostIsSkipped(result.skipSites)) {
            build();
        } else {
            destroy();
        }
    });
  }

  refresh();

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && (changes.ghosts || changes.skipSites)) refresh();
  });
})();
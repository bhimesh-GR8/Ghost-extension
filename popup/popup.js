const DEFAULTS = {
  thumbnails: true,
  effects: true,
  vignette: true,
  scare: true,
  ghosts: true,
  trail: true,
  skipSites: [],
};

const boxes = document.querySelectorAll("input[data-setting]");
const hostEl = document.getElementById("host");
const skipBtn = document.getElementById("skip");
const skipList = document.getElementById("skipList");
let currentHost = null;

// Same rule as skip.js: a listed site also covers its subdomains
function covers(site) {
  return currentHost === site || currentHost.endsWith("." + site);
}

function render(result) {
  boxes.forEach((box) => {
    box.checked = result[box.dataset.setting];
  });

  const sites = result.skipSites;

  skipList.replaceChildren();
  sites.forEach((site) => {
    const li = document.createElement("li");
    li.textContent = site;

    const remove = document.createElement("button");
    remove.textContent = "✕";
    remove.title = "Stop skipping " + site;
    remove.addEventListener("click", () => {
      saveSites(sites.filter((s) => s !== site));
    });

    li.append(remove);
    skipList.append(li);
  });

  if (currentHost) {
    skipBtn.disabled = false;
    const covering = sites.filter(covers);
    if (covering.length === 0) {
      skipBtn.textContent = "Skip this site";
    } else if (covering.includes(currentHost)) {
      skipBtn.textContent = "Stop skipping this site";
    } else {
      skipBtn.textContent = "Stop skipping this site (via " + covering[0] + ")";
    }
  } else {
    skipBtn.disabled = true;
    skipBtn.textContent = "Can't skip this page";
  }
}

function load() {
  chrome.storage.local.get(DEFAULTS, render);
}

function saveSites(sites) {
  chrome.storage.local.set({ skipSites: sites }, load);
}

boxes.forEach((box) => {
  box.addEventListener("change", () => {
    chrome.storage.local.set({ [box.dataset.setting]: box.checked });
  });
});

skipBtn.addEventListener("click", () => {
  chrome.storage.local.get({ skipSites: [] }, ({ skipSites }) => {
    const isSkipped = skipSites.some(covers);
    const next = isSkipped
      ? skipSites.filter((s) => !covers(s))
      : [...skipSites, currentHost];
    saveSites(next);
  });
});

document.getElementById("reset").addEventListener("click", () => {
  chrome.storage.local.clear(() => load());
});


chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  try {
    const url = new URL(tabs[0].url);
    if (url.protocol === "http:" || url.protocol === "https:") {
      currentHost = url.hostname.replace(/^www\./, "");
    }
  } catch (err) {
  }
  hostEl.textContent = currentHost ?? "(not a regular website)";
  load();
});

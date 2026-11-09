let creating;

async function createContextMenu() {
    creating = true;
    const contexts = await chrome.runtime.getContexts ({
        contextTypes: ["OFFSCREEN_DOCUMENT"]
    })


    if(contexts.length > 0) return;

    if (!creating) {
        creating = chrome.offscreen
        .createDocument({
            url:  "offscreen.html",
            reasons: ["BLOBS"],
            justification: "Play the jumpscare sound"
        })
        .finally(() => {
            creating = null;
        });
    }

}

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "play-scare-sound") {
        ensureOffscreenDocument()
    }
}
)
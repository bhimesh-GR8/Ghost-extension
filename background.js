let creating;

async function ensureOffscreen() {
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
  });
  if (contexts.length > 0) return;

  if (!creating) {
    creating = chrome.offscreen
      .createDocument({
        url: "offscreen/offscreen.html",
        reasons: ["AUDIO_PLAYBACK"],
        justification: "Play the jump scare sound",
      })
      .finally(() => {
        creating = null;
      });
  }
  await creating;
}


chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== "play-scare-sound") return;

  
  console.log("Ghost: background got the play request");
  ensureOffscreen()
    .then(() => chrome.runtime.sendMessage({ type: "offscreen-play" }))
    .catch((err) => console.error("Ghost: offscreen failed:", err));
});
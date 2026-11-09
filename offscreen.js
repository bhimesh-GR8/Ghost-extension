chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== "offscreen-play") return;

  
  console.log("Ghost: offscreen got the play request");
  const audio = new Audio("sounds/scare.mp3");
  audio.volume = 1.0;

  audio.play().catch((err) => console.error("Ghost: audio failed:", err));
});
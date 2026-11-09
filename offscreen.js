chrome.runtime.onMessage.addListener((message) => {
    if (message.type !== "offscreen-play") return;

    const audio = new Audio("sounds/scare.mp3");
    audio.volume = 0.5;
    audio.play();
});

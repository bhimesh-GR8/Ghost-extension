(() => {
  const MAX_PARTICLES = 150;
  let canvas = null;
  let ctx = null;
  let particles = [];
  let running = false;

  const rand = (min, max) => min + Math.random() * (max - min);

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function onMove(e) {
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: e.clientX + rand(-3, 3),
        y: e.clientY + rand(-3, 3),
        vx: rand(-0.4, 0.4),
        vy: rand(-0.9, -0.2),
        size: rand(4, 9),
        hue: rand(0, 30),
        life: 1,
      });
    }
    if (particles.length > MAX_PARTICLES) {
      particles.splice(0, particles.length - MAX_PARTICLES);
    }
    if (!running) {
      running = true;
      requestAnimationFrame(frame);
    }
  }

  function frame() {
    if (!canvas) {
      running = false;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      if (p.life <= 0) continue;

      const r = p.size * p.life * 3;
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      glow.addColorStop(0, `hsla(${p.hue}, 100%, 50%, ${Math.min(1, p.life * 1.2)})`);
      glow.addColorStop(1, `hsla(${p.hue}, 100%, 45%, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    particles = particles.filter((p) => p.life > 0);

    if (particles.length > 0) {
      requestAnimationFrame(frame);
    } else {
      running = false;
    }
  }

  function enable() {
    if (canvas) return;

    canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483646;";
    ctx = canvas.getContext("2d");
    resize();
    document.documentElement.append(canvas);

    window.addEventListener("resize", resize);
window.addEventListener("mousemove", onMove, { capture: true, passive: true });
  }

  function disable() {
    if (!canvas) return;

    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMove, true);
    canvas.remove();
    canvas = null;
    ctx = null;
    particles = [];
  }

  function refresh() {
    chrome.storage.local.get({ trail: true, skipSites: [] }, (result) => {
      if (result.trail && !ghostIsSkipped(result.skipSites)) {
        enable();
      } else {
        disable();
      }
    });
  }

  refresh();

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && (changes.trail || changes.skipSites)) refresh();
  });
})();
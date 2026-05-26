document.addEventListener("DOMContentLoaded", () => {
  const bg = document.createElement("div");
  bg.className = "hologram-bg";
  document.body.prepend(bg);

  const shine = document.createElement("div");
  shine.className = "shine";
  document.body.prepend(shine);

  const scanlines = document.createElement("div");
  scanlines.className = "scanlines";
  document.body.prepend(scanlines);

  const particles = document.createElement("div");
  particles.id = "particles";
  document.body.prepend(particles);

  const warp = document.createElement("div");
  warp.className = "warp";
  warp.innerHTML = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="cyan" stroke-width="0.3" opacity="0.3"/>
        <ellipse cx="100" cy="100" rx="70" ry="30" fill="none" stroke="magenta" stroke-width="0.3" opacity="0.3"/>
        <ellipse cx="100" cy="100" rx="50" ry="20" fill="none" stroke="cyan" stroke-width="0.3" opacity="0.3"/>
        <ellipse cx="100" cy="100" rx="30" ry="10" fill="none" stroke="yellow" stroke-width="0.3" opacity="0.3"/>
    </svg>`;
  document.body.prepend(warp);

  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 3 + 1;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = Math.random() * 10 + 8 + "s";
    p.style.animationDelay = Math.random() * 15 + "s";
    const hue = Math.random() > 0.5 ? "180" : "300";
    p.style.background = `rgba(${hue === "180" ? "0,255,255" : "255,0,255"}, ${Math.random() * 0.4 + 0.2})`;
    p.style.boxShadow = `0 0 ${size * 3}px rgba(${hue === "180" ? "0,255,255" : "255,0,255"}, 0.3)`;
    particles.appendChild(p);
  }

  const container = document.querySelector(".container");
  const title = document.querySelector(".title");

  let mouseX = 0,
    mouseY = 0;
  let targetX = 0,
    targetY = 0;

  document.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    mouseX += (targetX - mouseX) * 0.1;
    mouseY += (targetY - mouseY) * 0.1;

    const rotY = mouseX * 10;
    const rotX = -mouseY * 10;

    container.style.transform = `translateZ(30px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    bg.style.transform = `translateX(${mouseX * 10}px) translateY(${mouseY * 10}px)`;

    const shineX = 50 + mouseX * 30;
    const shineY = 50 + mouseY * 30;
    shine.style.background = `radial-gradient(
            circle at ${shineX}% ${shineY}%,
            rgba(255, 255, 255, 0.12) 0%,
            transparent 50%
        )`;

    const hueShift = mouseX * 20 + mouseY * 20;
    title.style.background = `linear-gradient(
            ${135 + hueShift}deg,
            #00ffff,
            #ff00ff,
            #ffff00,
            #00ffff,
            #ff00ff
        )`;
    title.style.backgroundSize = "400% 400%";
    title.style.webkitBackgroundClip = "text";
    title.style.backgroundClip = "text";

    requestAnimationFrame(animate);
  }

  animate();
});

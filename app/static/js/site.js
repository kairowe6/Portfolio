function toggleMenu() {
  var el = document.getElementById('sidebar');
  if (!el) return;
  el.classList.toggle('open');
}

function fakeChat(ev) {
  ev.preventDefault();
  const input = document.getElementById('chat-text');
  const log = document.getElementById('chat-log');
  if (!input || !log || !input.value.trim()) return false;

  const user = document.createElement('div');
  user.className = 'msg msg--user';
  user.textContent = input.value.trim();
  log.appendChild(user);

  const bot = document.createElement('div');
  bot.className = 'msg msg--bot';
  bot.textContent = "I’ll answer questions about posts and projects here once wired. For now, try clicking a card.";
  log.appendChild(bot);

  log.scrollTop = log.scrollHeight;
  input.value = "";
  return false;
}

function toggleMenu() {
  var el = document.getElementById('sidebar');
  if (!el) return;
  el.classList.toggle('open');
}

function fakeChat(ev) {
  ev.preventDefault();
  const input = document.getElementById('chat-text');
  const log = document.getElementById('chat-log');
  if (!input || !log || !input.value.trim()) return false;

  const user = document.createElement('div');
  user.className = 'msg msg--user';
  user.textContent = input.value.trim();
  log.appendChild(user);

  const bot = document.createElement('div');
  bot.className = 'msg msg--bot';
  bot.textContent = "I’ll answer questions about posts and projects here once wired. For now, try clicking a card.";
  log.appendChild(bot);

  log.scrollTop = log.scrollHeight;
  input.value = "";
  return false;
}

/* =========================
   Divider growth (per element, vh-based) + optional hero peek calibration
   ========================= */
(function () {
  const dividers = Array.from(document.querySelectorAll('.section-divider'));
  if (!dividers.length) return;

  const curve = 1.10;  // easing: >1 = gentler near top, faster near bottom

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function parseVhVar(el, name, fallbackVh){
    // Reads a custom property expected in 'vh' units; returns numeric vh
    const raw = getComputedStyle(el).getPropertyValue(name).trim();
    if (!raw) return fallbackVh;
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : fallbackVh;
  }

  function growTick(){
    const vh = Math.max(1, window.innerHeight);

    for (const d of dividers){
      const top = d.getBoundingClientRect().top;

      // distance from the viewport TOP, normalized 0..1 (0=top, 1=bottom)
      const tNorm = clamp(top, 0, vh) / vh;
      const eased = Math.pow(tNorm, curve);

      const maxExtraVh = parseVhVar(d, '--divider-max', 15);  // in vh
      const growVh = eased * maxExtraVh;

      d.style.setProperty('--grow', growVh.toFixed(3) + 'vh');
    }

    requestAnimationFrame(growTick);
  }

  // Optional: keep this if you like the “About Me just peeking” on load.
  function calibrateHeroPeek(){
    const hero = document.querySelector('.section-divider.divider-hero');
    if (!hero) return;

    const nextSection = hero.nextElementSibling;
    if (!nextSection) return;

    const heading = nextSection.querySelector('h2,h1,h3') || nextSection;

    // Where the heading should sit on load (e.g., 90% down the viewport)
    const targetY = window.innerHeight * 0.90;
    const currentY = heading.getBoundingClientRect().top;

    // Convert delta px -> vh units
    const deltaVh = ((targetY - currentY) / Math.max(1, window.innerHeight)) * 100;

    const baseNowVh = parseVhVar(hero, '--divider-base', 12);
    const newBaseVh = clamp(baseNowVh + deltaVh, 4, 30);  // sane clamps in vh

    hero.style.setProperty('--divider-base', newBaseVh.toFixed(2) + 'vh');
  }

  window.addEventListener('load', calibrateHeroPeek);
  window.addEventListener('resize', calibrateHeroPeek);

  requestAnimationFrame(growTick);
})();


// Anchor the prose mask to the viewport bottom
(function () {
  const prose = document.querySelector('.prose');
  if (!prose) return;

  function tick(){
    // distance from the prose’s top in document space to current scroll
    const rectTop = prose.getBoundingClientRect().top + (window.scrollY || 0);
    const maskY = (window.scrollY || 0) - rectTop;   // shift mask with scroll so it stays fixed to viewport
    prose.style.setProperty('--proseMaskY', maskY + 'px');
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

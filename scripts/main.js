(() => {
  const root = document.documentElement;
  const LANG_KEY = "cv-lang";

  function applyLang(lang) {
    root.lang = lang;
    document.querySelectorAll(".lang-toggle button").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
  }

  const savedLang = localStorage.getItem(LANG_KEY);
  applyLang(savedLang === "en" || savedLang === "sv" ? savedLang : "sv");

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      localStorage.setItem(LANG_KEY, lang);
      applyLang(lang);
    });
  });

  const year = new Date().getFullYear();
  document.getElementById("year") && (document.getElementById("year").textContent = year);
  document.getElementById("year-sv") && (document.getElementById("year-sv").textContent = year);

  // Section scroll-spy.
  // Active = last section whose top has crossed an anchor line.
  // The anchor line normally sits at scroll-padding (where anchor clicks land)
  // but slides toward the middle of the viewport near the bottom of the page
  // so short trailing sections still activate.
  // On nav click, active becomes "sticky" to the target until the user scrolls
  // manually (wheel / touch / arrow keys).
  const navLinks = [...document.querySelectorAll(".rail-nav a")];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  let sticky = null;

  function setActive(id) {
    navLinks.forEach((n) => {
      n.classList.toggle("active", n.getAttribute("href") === "#" + id);
    });
  }

  function updateActive() {
    if (!sections.length) return;
    if (sticky) { setActive(sticky); return; }

    const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    const atMax = window.scrollY + vh >= docH - 2;

    let activeId = sections[0].id;

    if (atMax) {
      // At the very bottom the rail can't match scroll-padding for trailing
      // sections. Pick the bottommost section whose top is inside the viewport.
      for (const s of sections) {
        const t = s.getBoundingClientRect().top;
        if (t >= 0 && t < vh) activeId = s.id;
      }
    } else {
      const line = pad + 4;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) activeId = s.id;
      }
    }

    setActive(activeId);
  }

  if (sections.length) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const id = link.getAttribute("href").slice(1);
        sticky = id;
        setActive(id);
      });
    });

    const releaseSticky = () => {
      if (sticky) { sticky = null; updateActive(); }
    };
    window.addEventListener("wheel", releaseSticky, { passive: true });
    window.addEventListener("touchmove", releaseSticky, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (["PageDown","PageUp","ArrowDown","ArrowUp","Home","End"," "].includes(e.key)) releaseSticky();
    });

    updateActive();
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateActive(); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  function applyTheme(mode) { root.dataset.theme = mode; }
})();

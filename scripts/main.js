(() => {
  const root = document.documentElement;
  const STORAGE_KEY = "cv-theme";

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const saved = localStorage.getItem(STORAGE_KEY);
  applyTheme(saved ?? (prefersDark.matches ? "dark" : "light"));

  prefersDark.addEventListener("change", (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches ? "dark" : "light");
  });

  const toggle = document.getElementById("theme-toggle");
  toggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function applyTheme(mode) {
    root.dataset.theme = mode;
  }
})();

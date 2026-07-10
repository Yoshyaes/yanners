const THEME_KEY = "theme";

type ThemeName = "golden" | "nightstand";

function getCurrentTheme(): ThemeName {
  return document.documentElement.classList.contains("theme-golden") ? "golden" : "nightstand";
}

function syncButton(button: HTMLButtonElement, name: ThemeName): void {
  const isGolden = name === "golden";
  button.setAttribute("aria-pressed", isGolden ? "true" : "false");
  button.setAttribute("aria-label", isGolden ? "Switch to Nightstand" : "Switch to Golden Hour");
  const sun = button.querySelector<HTMLElement>(".icon-sun");
  const moon = button.querySelector<HTMLElement>(".icon-moon");
  sun?.classList.toggle("is-hidden", isGolden);
  moon?.classList.toggle("is-hidden", !isGolden);
}

function applyTheme(button: HTMLButtonElement, name: ThemeName): void {
  document.documentElement.classList.remove("theme-nightstand", "theme-golden");
  document.documentElement.classList.add(`theme-${name}`);
  try {
    localStorage.setItem(THEME_KEY, name);
  } catch (e) {
    /* localStorage unavailable, theme just won't persist */
  }
  syncButton(button, name);
}

const button = document.querySelector<HTMLButtonElement>("#appearance-toggle");

if (button) {
  syncButton(button, getCurrentTheme());
  button.addEventListener("click", () => {
    const next: ThemeName = getCurrentTheme() === "golden" ? "nightstand" : "golden";
    applyTheme(button, next);
  });
}

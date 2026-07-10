const vmodal = document.getElementById("vmodal");
const vframe = document.getElementById("vmodalFrame");
const vmodalClose = document.getElementById("vmodalClose") as HTMLButtonElement | null;
const chips = document.querySelectorAll<HTMLAnchorElement>(".vchip[data-src]");

let lastFocusedEl: HTMLElement | null = null;

function getFocusable(): HTMLElement[] {
  if (!vmodal) return [];
  return Array.from(vmodal.querySelectorAll<HTMLElement>("button, [href], iframe"));
}

function openModal(embedSrc: string, label: string, triggerEl: HTMLElement): void {
  if (!vmodal || !vframe) return;

  lastFocusedEl = triggerEl;

  const iframe = document.createElement("iframe");
  iframe.src = embedSrc;
  iframe.title = `${label} video player`;
  iframe.allow = "autoplay; encrypted-media; fullscreen";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  vframe.innerHTML = "";
  vframe.appendChild(iframe);

  vmodal.setAttribute("aria-label", `${label} video player`);
  vmodal.classList.add("open");
  vmodalClose?.focus();
}

function closeModal(): void {
  if (!vmodal || !vframe) return;

  vmodal.classList.remove("open");
  vframe.innerHTML = "";
  vmodal.setAttribute("aria-label", "Video player");

  if (lastFocusedEl) {
    lastFocusedEl.focus();
    lastFocusedEl = null;
  }
}

chips.forEach((chip) => {
  chip.addEventListener("click", (e) => {
    const src = chip.dataset.src;
    const label = chip.dataset.label ?? "";
    if (!src) return;
    e.preventDefault();
    openModal(src, label, chip);
  });
});

vmodalClose?.addEventListener("click", closeModal);

vmodal?.addEventListener("click", (e) => {
  if (e.target === vmodal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!vmodal || !vmodal.classList.contains("open")) return;

  if (e.key === "Escape") {
    closeModal();
    return;
  }

  if (e.key !== "Tab") return;

  const focusable = getFocusable();
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (focusable.length === 1) {
    e.preventDefault();
    first.focus();
    return;
  }

  if (e.shiftKey) {
    if (active === first || !focusable.includes(active as HTMLElement)) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (active === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

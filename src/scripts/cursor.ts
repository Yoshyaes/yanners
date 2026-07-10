const cur = document.querySelector<HTMLElement>(".cursor");

const disable =
  matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(hover: none)").matches;

if (cur && disable) {
  cur.remove();
} else if (cur) {
  let cx = innerWidth / 2;
  let cy = innerHeight / 2;
  let tx = cx;
  let ty = cy;

  addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  (function loop() {
    cx += (tx - cx) * 0.2;
    cy += (ty - cy) * 0.2;
    cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll("a,button").forEach((el) => {
    el.addEventListener("mouseenter", () => cur.classList.add("big"));
    el.addEventListener("mouseleave", () => cur.classList.remove("big"));
  });
}

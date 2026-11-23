// Page behaviour: header state, mobile menu, active anchor, sticky call bar,
// direction details, before/after comparison, doctors strip arrows.
// Everything is progressive: without JS the content is visible and links work.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Header border after scroll */
const header = document.querySelector<HTMLElement>("[data-header]");
const hero = document.getElementById("hero");
if (header && hero && "IntersectionObserver" in window) {
  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = "position:absolute;top:0;height:8px;width:1px;";
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => header.classList.toggle("is-scrolled", !e.isIntersecting)).observe(sentinel);
}

/* Mobile menu */
const menu = document.querySelector<HTMLElement>("[data-menu]");
const openBtn = document.querySelector<HTMLButtonElement>("[data-menu-open]");
const closeBtn = document.querySelector<HTMLButtonElement>("[data-menu-close]");
function setMenu(open: boolean): void {
  if (!menu || !openBtn) return;
  menu.hidden = !open;
  openBtn.setAttribute("aria-expanded", String(open));
  document.documentElement.classList.toggle("menu-open", open);
  if (open) closeBtn?.focus();
  else openBtn.focus();
}
openBtn?.addEventListener("click", () => setMenu(true));
closeBtn?.addEventListener("click", () => setMenu(false));
menu?.querySelectorAll<HTMLAnchorElement>("[data-menu-link]").forEach((a) =>
  a.addEventListener("click", () => {
    if (!menu || !openBtn) return;
    menu.hidden = true;
    openBtn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("menu-open");
  }),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu && !menu.hidden) setMenu(false);
});
menu?.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const items = Array.from(menu.querySelectorAll<HTMLElement>("a[href], button, [tabindex='0']")).filter((el) => el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* Active anchor in the desktop menu */
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
if (navLinks.length && "IntersectionObserver" in window) {
  const byId = new Map(navLinks.filter((a) => a.pathname === location.pathname).map((a) => [a.hash.slice(1), a]));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        navLinks.forEach((a) => a.removeAttribute("aria-current"));
        byId.get(e.target.id)?.setAttribute("aria-current", "true");
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  document.querySelectorAll<HTMLElement>("main > section[id]").forEach((s) => io.observe(s));
}

/* Sticky call bar (phones): shown after the hero leaves the screen */
const sticky = document.querySelector<HTMLElement>("[data-sticky-call]");
if (sticky && hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => sticky.classList.toggle("is-shown", !e.isIntersecting), { threshold: 0 }).observe(hero);
} else sticky?.classList.add("is-shown");

/* Direction details */
document.querySelectorAll<HTMLButtonElement>("[data-more-toggle]").forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute("aria-controls") ?? "");
  if (!panel) return;
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    panel.dataset.open = String(open);
  });
});

/* Before / after comparison */
const cases = document.querySelector<HTMLElement>("[data-cases]");
if (cases) {
  const range = cases.querySelector<HTMLInputElement>("[data-cases-range]");
  const frames = Array.from(cases.querySelectorAll<HTMLElement>("[data-case]"));
  const tabs = Array.from(cases.querySelectorAll<HTMLButtonElement>("[data-case-tab]"));
  const setPos = (v: string) => cases.style.setProperty("--pos", `${v}%`);
  range?.addEventListener("input", () => {
    setPos(range.value);
    range.setAttribute("aria-valuetext", `Після: ${100 - Number(range.value)}% кадру`);
  });
  const show = (i: number) => {
    frames.forEach((f, n) => f.toggleAttribute("data-active", n === i));
    tabs.forEach((t, n) => t.setAttribute("aria-pressed", String(n === i)));
    const label = frames[i]?.dataset.label ?? "";
    if (range) range.setAttribute("aria-label", `Порівняння до і після: ${label}`);
  };
  tabs.forEach((t, i) => t.addEventListener("click", () => show(i)));
  show(0);
}

/* Doctors strip arrows (phones) */
const strip = document.querySelector<HTMLElement>("[data-strip]");
if (strip) {
  const step = () => (strip.querySelector<HTMLElement>("li")?.offsetWidth ?? 280) + 16;
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
  document.querySelector("[data-strip-prev]")?.addEventListener("click", () => strip.scrollBy({ left: -step(), behavior }));
  document.querySelector("[data-strip-next]")?.addEventListener("click", () => strip.scrollBy({ left: step(), behavior }));
}

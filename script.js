const menuToggle = document.querySelector("[data-menu-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const header = document.querySelector("[data-header]");
const parallaxItems = document.querySelectorAll("[data-parallax]");

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navPanel.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navPanel.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
);

document.querySelectorAll(".service-card, .gallery-card, .brand-highlights article").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
});

document.querySelectorAll(".reveal, .reveal-from-right").forEach((element) => {
  observer.observe(element);
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const updateParallax = () => {
  const offset = Math.min(window.scrollY * 0.035, 18);
  parallaxItems.forEach((item) => {
    item.style.setProperty("--parallax", `${offset}px`);
  });
};

const updateScrollState = () => {
  updateHeader();
  updateParallax();
};

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

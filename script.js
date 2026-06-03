const menuToggle = document.querySelector("[data-menu-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const header = document.querySelector("[data-header]");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const nav = document.querySelector(".nav");

document.body.classList.remove("no-js");
document.body.classList.add("js-enabled");

const setMenuA11yState = (isOpen) => {
  if (!menuToggle) {
    return;
  }
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
};

if (menuToggle && navPanel) {
  const navLinks = [...navPanel.querySelectorAll("a")];
  let lastFocusedElement = null;

  const closeMenu = ({ restoreFocus = false } = {}) => {
    navPanel.classList.remove("is-open");
    setMenuA11yState(false);
    if (restoreFocus) {
      menuToggle.focus();
    }
  };

  const openMenu = () => {
    lastFocusedElement = document.activeElement;
    navPanel.classList.add("is-open");
    setMenuA11yState(true);
    navLinks[0]?.focus();
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.contains("is-open");
    if (isOpen) {
      closeMenu({ restoreFocus: true });
      return;
    }
    openMenu();
  });

  navPanel.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      closeMenu({ restoreFocus: false });
    }
  });

  document.addEventListener("click", (event) => {
    if (!navPanel.classList.contains("is-open")) {
      return;
    }
    if (nav?.contains(event.target)) {
      return;
    }
    closeMenu({ restoreFocus: false });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navPanel.classList.contains("is-open")) {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key !== "Tab" || !navPanel.classList.contains("is-open")) {
      return;
    }

    const focusableElements = [menuToggle, ...navLinks].filter(Boolean);
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) {
      closeMenu({ restoreFocus: false });
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement = null;
      }
    }
  });
}

document.querySelectorAll(".service-card, .gallery-card, .brand-highlights article").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
});

if ("IntersectionObserver" in window) {
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

  document.querySelectorAll(".reveal, .reveal-from-right").forEach((element) => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll(".reveal, .reveal-from-right").forEach((element) => {
    element.classList.add("is-visible");
  });
}

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

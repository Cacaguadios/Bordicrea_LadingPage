const menuToggle = document.querySelector("[data-menu-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const header = document.querySelector("[data-header]");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const nav = document.querySelector(".nav");
const introLoader = document.querySelector("[data-intro-loader]");
const introLogo = document.querySelector(".intro-logo");
const introThread = document.querySelector("[data-intro-thread]");
const introTagline = document.querySelector("[data-intro-tagline]");
const heroGrid = document.querySelector(".hero-grid");
const reduceMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = typeof window.gsap !== "undefined";
const hasScrollTrigger = hasGsap && typeof window.ScrollTrigger !== "undefined";

if (hasScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
}

document.body.classList.remove("no-js");
document.body.classList.add("js-enabled");

const lenis = !reduceMotionPreference && typeof window.Lenis !== "undefined"
  ? new window.Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.05,
    })
  : null;

if (lenis) {
  lenis.on("scroll", () => {
    if (hasScrollTrigger) {
      window.ScrollTrigger.update();
    }
  });

  const raf = (time) => {
    lenis.raf(time);
    window.requestAnimationFrame(raf);
  };

  window.requestAnimationFrame(raf);
}

const initGsapRevealSystem = () => {
  if (!hasGsap || !hasScrollTrigger || reduceMotionPreference) {
    document.querySelectorAll(".reveal, .reveal-from-right").forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  window.gsap.utils.toArray(".reveal").forEach((element) => {
    window.gsap.fromTo(
      element,
      { autoAlpha: 0, y: 18 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          once: true,
        },
      }
    );
  });

  window.gsap.utils.toArray(".reveal-from-right").forEach((element) => {
    window.gsap.fromTo(
      element,
      { autoAlpha: 0, x: 24 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.72,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          once: true,
        },
      }
    );
  });

  const galleryCards = window.gsap.utils.toArray(".gallery-card");
  if (galleryCards.length > 0) {
    window.gsap.fromTo(
      galleryCards,
      { autoAlpha: 0, y: 40, scale: 0.965 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 82%",
          once: true,
        },
      }
    );
  }
};

const finishIntro = () => {
  introLoader?.remove();
  document.body.classList.remove("intro-active");
  initGsapRevealSystem();
};

if (introLoader) {
  const waitForSiteAssets = () =>
    new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", resolve, { once: true });
    });
  const waitForLoaderShowcase = () =>
    new Promise((resolve) => {
      window.setTimeout(resolve, 3200);
    });
  const waitForIntroReady = () => Promise.all([waitForSiteAssets(), waitForLoaderShowcase()]);

  if (!hasGsap || reduceMotionPreference) {
    waitForIntroReady().then(finishIntro);
  } else {
    document.body.classList.add("intro-active");

    window.gsap.set(introLogo, { autoAlpha: 1, y: 0, scale: 1 });
    window.gsap.set(introThread, { scaleX: 0, transformOrigin: "left center" });
    window.gsap.set(introTagline, { autoAlpha: 0, y: 12 });
    window.gsap.set(heroGrid, { autoAlpha: 0, y: 36 });

    const introTl = window.gsap.timeline();

    introTl
      .to(introThread, { scaleX: 1, duration: 1.2, ease: "power3.inOut" })
      .to(introTagline, { autoAlpha: 1, y: 0, duration: 0.82, ease: "power2.out" }, "-=0.2");

    waitForIntroReady().then(() => {
      window.gsap
        .timeline()
        .to(introLoader, {
          autoAlpha: 0,
          duration: 0.95,
          delay: 0.25,
          ease: "power3.inOut",
          onComplete: finishIntro,
        })
        .to(heroGrid, { autoAlpha: 1, y: 0, duration: 1.15, ease: "power3.out" }, "-=0.28");
    });
  }
} else {
  initGsapRevealSystem();
}

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

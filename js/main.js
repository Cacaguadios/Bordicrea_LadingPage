const WHATSAPP_NUMBER = "5212223254426";
const DEFAULT_WHATSAPP_MESSAGE = "Hola Bordicrea, me gustaría cotizar un bordado personalizado.";

const body = document.body;
const loader = document.querySelector("#page-loader");
const header = document.querySelector("#site-header");
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector("#nav-menu");
const filterButtons = document.querySelectorAll(".filter-button");
const catalogCards = document.querySelectorAll(".catalog-card");
const revealElements = document.querySelectorAll(".reveal");
const heroCarousel = document.querySelector('[data-carousel="hero"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

body.classList.add("is-loading");

const setRevealDelays = () => {
  const staggerGroups = [
    ".hero__stats article",
    ".services__grid .reveal",
    ".reasons__list .reveal",
    ".product-grid .reveal",
    ".catalog__grid .reveal",
    ".process__line .reveal",
    ".quote-guide__list .reveal",
    ".testimonials__grid .reveal",
    ".faq__grid .reveal"
  ];

  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
    });
  });
};

const buildWhatsappUrl = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const closeMobileMenu = () => {
  navToggle?.classList.remove("is-open");
  navMenu?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

const updateHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const initHeroCarousel = () => {
  if (!heroCarousel) {
    return;
  }

  const slides = [...heroCarousel.querySelectorAll(".hero-carousel__slide")];
  const dots = [...heroCarousel.querySelectorAll(".hero-carousel__dots button")];

  if (slides.length < 2 || dots.length !== slides.length) {
    return;
  }

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  activeIndex = activeIndex >= 0 ? activeIndex : 0;
  let carouselInterval;

  const setActiveSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    const previewIndex = (activeIndex + 1) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      const isNext = index === previewIndex;

      slide.classList.toggle("is-active", isActive);
      slide.classList.toggle("is-next", isNext);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;

      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });
  };

  const startCarousel = () => {
    if (prefersReducedMotion || carouselInterval) {
      return;
    }

    carouselInterval = window.setInterval(() => {
      setActiveSlide(activeIndex + 1);
    }, 4200);
  };

  const stopCarousel = () => {
    window.clearInterval(carouselInterval);
    carouselInterval = undefined;
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopCarousel();
      setActiveSlide(index);
      startCarousel();
    });
  });

  heroCarousel.addEventListener("mouseenter", stopCarousel);
  heroCarousel.addEventListener("mouseleave", startCarousel);
  heroCarousel.addEventListener("focusin", stopCarousel);
  heroCarousel.addEventListener("focusout", startCarousel);

  setActiveSlide(activeIndex);
  startCarousel();
};

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loader?.classList.add("is-hidden");
    body.classList.remove("is-loading");
  }, 650);
});

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu?.classList.toggle("is-open") ?? false;
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#" || !targetId.startsWith("#")) {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    closeMobileMenu();
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  });
});

document.querySelectorAll(".js-whatsapp").forEach((button) => {
  button.setAttribute("href", buildWhatsappUrl(DEFAULT_WHATSAPP_MESSAGE));
  button.setAttribute("target", "_blank");
  button.setAttribute("rel", "noopener noreferrer");
});

document.querySelectorAll(".js-whatsapp-product").forEach((button) => {
  const productName = button.dataset.product || "bordado personalizado";
  const message = `Hola Bordicrea, me gustaría cotizar: ${productName}.`;

  button.setAttribute("href", buildWhatsappUrl(message));
  button.setAttribute("target", "_blank");
  button.setAttribute("rel", "noopener noreferrer");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter || "todos";

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    catalogCards.forEach((card) => {
      const shouldShow = selectedFilter === "todos" || card.dataset.category === selectedFilter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

setRevealDelays();
initHeroCarousel();

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeMobileMenu();
  }
});

updateHeaderState();

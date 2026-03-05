/* ============================================================
   Robert García Correa — Portfolio Scripts
   Language toggle, scroll effects, mobile menu, typing animation
   ============================================================ */

(function () {
  "use strict";

  // --- Typing Animation ---
  const typingStrings = {
    en: [
      "Computer Systems Engineering Student",
      "Competitive Programmer",
      "Full-Stack Developer",
      "ICPC Mexico Finals 2025",
      "Algorithm Enthusiast",
    ],
    es: [
      "Estudiante de Ing. en Sistemas Computacionales",
      "Programador Competitivo",
      "Desarrollador Full-Stack",
      "ICPC Mexico Finals 2025",
      "Entusiasta de Algoritmos",
    ],
  };

  let typingIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout = null;

  function typeEffect() {
    const el = document.getElementById("typingText");
    if (!el) return;

    const strings = typingStrings[currentLang] || typingStrings.en;
    const currentString = strings[typingIndex % strings.length];

    if (!isDeleting) {
      el.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentString.length) {
        // Pause before deleting
        typingTimeout = setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 2000);
        return;
      }
      typingTimeout = setTimeout(typeEffect, 60);
    } else {
      el.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        typingIndex++;
        typingTimeout = setTimeout(typeEffect, 400);
        return;
      }
      typingTimeout = setTimeout(typeEffect, 30);
    }
  }

  function restartTyping() {
    if (typingTimeout) clearTimeout(typingTimeout);
    typingIndex = 0;
    charIndex = 0;
    isDeleting = false;
    const el = document.getElementById("typingText");
    if (el) el.textContent = "";
    setTimeout(typeEffect, 600);
  }

  // --- Language Toggle ---
  let currentLang = "en";

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "es" ? "es" : "en");

    const elements = document.querySelectorAll("[data-en][data-es]");
    elements.forEach((el) => {
      const text = el.getAttribute("data-" + lang);
      if (text) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    const toggle = document.getElementById("langToggle");
    if (toggle) {
      const active = toggle.querySelector(".lang-toggle__active");
      const inactive = toggle.querySelector(".lang-toggle__inactive");
      if (lang === "en") {
        active.textContent = "EN";
        inactive.textContent = "ES";
      } else {
        active.textContent = "ES";
        inactive.textContent = "EN";
      }
    }

    document.title =
      lang === "es"
        ? "José Roberto García Correa — Ingeniero de Software"
        : "José Roberto García Correa — Software Engineer";

    try {
      localStorage.setItem("portfolio-lang", lang);
    } catch (e) {}

    // Restart typing with new language
    restartTyping();
  }

  function initLanguage() {
    let savedLang = null;
    try {
      savedLang = localStorage.getItem("portfolio-lang");
    } catch (e) {}

    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang && browserLang.startsWith("es")) {
        setLanguage("es");
      } else {
        setLanguage("en");
      }
    }

    const toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        setLanguage(currentLang === "en" ? "es" : "en");
      });
    }
  }

  // --- Navigation Scroll Effect ---
  function initNavScroll() {
    const nav = document.getElementById("nav");
    if (!nav) return;

    let ticking = false;
    function updateNav() {
      if (window.scrollY > 10) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateNav);
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  // --- Mobile Menu ---
  function initMobileMenu() {
    const toggle = document.getElementById("mobileToggle");
    const menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      menu.classList.toggle("active");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.classList.remove("active");
        menu.classList.remove("active");
      });
    });
  }

  // --- Smooth Scroll ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // --- Scroll Reveal ---
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      ".section__title, .project-card, .achievement, .about__text, .about__details, .skills, .cp__text, .cp__profiles, .contact__info, .contact__form, .exp-card",
    );

    revealElements.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // --- Active Nav Highlight ---
  function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.style.color = "";
              if (link.getAttribute("href") === "#" + id) {
                link.style.color = "var(--color-text)";
              }
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
  }

  // --- Initialize ---
  function init() {
    initLanguage();
    initNavScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initActiveNav();
    // Typing starts via initLanguage -> setLanguage -> restartTyping
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ============================================================
   Robert García Correa — Portfolio Scripts
   Theme manager, language toggle, counters, scroll reveal,
   nav state, mobile menu, smooth scroll, active nav.
   ============================================================ */

(function () {
  "use strict";

  // --- Theme Manager ---
  // data-theme is set before first paint by the inline script in <head>.
  // Only an explicit toggle click persists the choice: first-visit themes
  // derived from the OS must keep following the OS.
  function applyTheme(theme, persist) {
    document.documentElement.dataset.theme = theme;

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var paper = getComputedStyle(document.documentElement).getPropertyValue("--paper").trim();
      if (paper) meta.setAttribute("content", paper);
    }

    var toggle = document.getElementById("themeToggle");
    if (toggle) toggle.textContent = theme === "dark" ? "☀" : "☾";

    if (persist) {
      try {
        localStorage.setItem("portfolio-theme", theme);
      } catch (e) {}
    }
  }

  function hasStoredTheme() {
    try {
      return localStorage.getItem("portfolio-theme") !== null;
    } catch (e) {
      return false;
    }
  }

  function initTheme() {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light", false);

    var toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(next, true);
      });
    }

    // Follow OS theme changes while the user has not made an explicit choice.
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) {
      mq.addEventListener("change", function (e) {
        if (!hasStoredTheme()) applyTheme(e.matches ? "dark" : "light", false);
      });
    }
  }

  // --- Language Toggle ---
  var currentLang = "en";

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "es" ? "es" : "en");

    document.querySelectorAll("[data-en][data-es]").forEach(function (el) {
      var text = el.getAttribute("data-" + lang);
      if (!text) return;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });

    var toggle = document.getElementById("langToggle");
    if (toggle) toggle.textContent = lang === "en" ? "ES" : "EN";

    document.title =
      lang === "es"
        ? "José Roberto García Correa — Ingeniero de Software"
        : "José Roberto García Correa — Software Engineer";

    try {
      localStorage.setItem("portfolio-lang", lang);
    } catch (e) {}
  }

  function initLanguage() {
    var savedLang = null;
    try {
      savedLang = localStorage.getItem("portfolio-lang");
    } catch (e) {}

    if (savedLang === "en" || savedLang === "es") {
      setLanguage(savedLang);
    } else {
      var browserLang = navigator.language || "";
      setLanguage(browserLang.indexOf("es") === 0 ? "es" : "en");
    }

    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        setLanguage(currentLang === "en" ? "es" : "en");
      });
    }
  }

  // --- Count-up Counters ---
  // Final values live in the HTML; animation is an enhancement only.
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);

          var el = entry.target;
          var end = parseInt(el.dataset.count, 10);
          if (isNaN(end)) return;
          var t0 = null;

          function step(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / 900, 1);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  // --- Scroll Reveal v2 ---
  // The CSS only hides [data-reveal] elements under html.reveal-ready, so
  // content stays visible when JS is disabled or fails to load.
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    document.documentElement.classList.add("reveal-ready");

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  // --- Mobile Menu ---
  function initMobileMenu() {
    var toggle = document.getElementById("mobileToggle");
    var menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    function closeMenu() {
      toggle.classList.remove("active");
      menu.classList.remove("active");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggle.classList.toggle("active");
      menu.classList.toggle("active");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close when clicking anywhere outside the menu (incl. logo / "top" links).
    document.addEventListener("click", function (e) {
      if (menu.classList.contains("active") && !menu.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // --- Smooth Scroll ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        if (targetId === "#") return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // --- Active Nav Highlight ---
  function initActiveNav() {
    var sections = document.querySelectorAll("section[id], header[id]");
    var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" },
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // --- Initialize ---
  function init() {
    initTheme();
    initLanguage();
    initCounters();
    initReveal();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ============================================================
   Robert García Correa — Portfolio Scripts
   Language toggle, scroll effects, mobile menu
   ============================================================ */

(function () {
    'use strict';

    // --- Language Toggle ---
    const translations = {
        en: {},
        es: {}
    };

    let currentLang = 'en';

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang === 'es' ? 'es' : 'en');

        // Update all elements with data-en / data-es attributes
        const elements = document.querySelectorAll('[data-en][data-es]');
        elements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Update lang toggle button
        const label = document.getElementById('langLabel');
        const toggle = document.getElementById('langToggle');
        if (label && toggle) {
            const active = toggle.querySelector('.lang-toggle__active');
            const inactive = toggle.querySelector('.lang-toggle__inactive');
            if (lang === 'en') {
                active.textContent = 'EN';
                inactive.textContent = 'ES';
            } else {
                active.textContent = 'ES';
                inactive.textContent = 'EN';
            }
        }

        // Update page title
        document.title = lang === 'es'
            ? 'José Roberto García Correa — Ingeniero de Software'
            : 'José Roberto García Correa — Software Engineer';

        // Save preference
        try {
            localStorage.setItem('portfolio-lang', lang);
        } catch (e) {
            // localStorage not available
        }
    }

    function initLanguage() {
        // Check saved preference
        let savedLang = null;
        try {
            savedLang = localStorage.getItem('portfolio-lang');
        } catch (e) {
            // localStorage not available
        }

        if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
            setLanguage(savedLang);
        } else {
            // Check browser language
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang && browserLang.startsWith('es')) {
                setLanguage('es');
            } else {
                setLanguage('en');
            }
        }

        // Bind toggle
        const toggle = document.getElementById('langToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                setLanguage(currentLang === 'en' ? 'es' : 'en');
            });
        }
    }

    // --- Navigation Scroll Effect ---
    function initNavScroll() {
        const nav = document.getElementById('nav');
        if (!nav) return;

        let ticking = false;

        function updateNav() {
            if (window.scrollY > 10) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNav);
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Mobile Menu ---
    function initMobileMenu() {
        const toggle = document.getElementById('mobileToggle');
        const menu = document.getElementById('mobileMenu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Close menu on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }

    // --- Smooth Scroll for Nav Links ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // --- Scroll Reveal ---
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.section__title, .project-card, .achievement, .about__text, .about__details, .skills, .cp__text, .cp__profiles, .contact__info, .contact__form'
        );

        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealElements.forEach(el => observer.observe(el));
    }

    // --- Active Nav Highlight ---
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            link.style.color = '';
                            if (link.getAttribute('href') === `#${id}`) {
                                link.style.color = 'var(--color-text)';
                            }
                        });
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-80px 0px -50% 0px'
            }
        );

        sections.forEach(section => observer.observe(section));
    }

    // --- Initialize Everything ---
    function init() {
        initLanguage();
        initNavScroll();
        initMobileMenu();
        initSmoothScroll();
        initScrollReveal();
        initActiveNav();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
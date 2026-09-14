/* ============================================================
   PORTFOLIO — script.js
   Interaksi ringan: hamburger, dark mode, reveal, footer, form
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Dark / Light mode ---------- */
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  // localStorage aman dipakai karena file dijalankan di browser/hosting sendiri.
  // Bungkus try-catch agar tetap jalan kalau storage dinonaktifkan.
  let savedTheme = null;
  try {
    savedTheme = window.localStorage.getItem('theme');
  } catch (e) { /* ignore */ }

  if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', function () {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    try {
      window.localStorage.setItem('theme', next);
    } catch (e) { /* ignore */ }
  });

  /* ---------- Hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', function () {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Tutup menu setelah klik link (mobile)
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal animation ---------- */
  const revealEls = document.querySelectorAll('.section, .project-card, .game-card, .music-card, .skill-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Typing effect nama di hero ---------- */
  const heroName = document.getElementById('heroName');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroName && heroName.dataset.text && !reduceMotion) {
    const fullText = heroName.dataset.text;
    const typeSpeed = 90;
    let i = 0;

    heroName.textContent = '';

    const typeNext = function () {
      if (i <= fullText.length) {
        heroName.textContent = fullText.slice(0, i);
        i += 1;
        setTimeout(typeNext, typeSpeed);
      }
    };

    // Tunggu greeting fade-in, lalu mulai ketik
    setTimeout(typeNext, 800);
  }

  /* ---------- Footer tahun otomatis ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Validasi form kontak ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      let valid = true;

      const setError = function (el, isError) {
        el.style.borderColor = isError ? '#e11d48' : '';
      };

      if (name.value.trim() === '') { valid = false; setError(name, true); } else { setError(name, false); }
      if (message.value.trim() === '') { valid = false; setError(message, true); } else { setError(message, false); }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { valid = false; setError(email, true); } else { setError(email, false); }

      if (valid) {
        // Catatan: tanpa backend/Formspree, pesan tidak benar-benar terkirim.
        alert('Terima kasih! (Integrasi pengiriman pesan belum diaktifkan.)');
        form.reset();
      } else {
        alert('Mohon lengkapi form dengan benar.');
      }
    });
  }
})();
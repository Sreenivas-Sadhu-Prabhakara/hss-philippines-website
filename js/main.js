/* HSS Philippines — shared interactions
   Mobile nav, sticky-header shadow, scroll reveal, current year,
   auto active-nav fallback, and Netlify-friendly form success UX. */
(function () {
  'use strict';

  // Mark JS available so scroll-reveal only hides content when it can reveal it
  document.documentElement.classList.add('js');

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    var closeMenu = function () {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      menu.classList.remove('is-open');
    };
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      menu.classList.toggle('is-open', !open);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    // Reset when resizing up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 940) closeMenu();
    });
  }

  /* ---- Sticky header shadow ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Active nav fallback (if page didn't set aria-current) ---- */
  var links = document.querySelectorAll('.nav-links a');
  if (links.length) {
    var here = location.pathname.split('/').pop() || 'index.html';
    var anySet = false;
    links.forEach(function (a) { if (a.getAttribute('aria-current') === 'page') anySet = true; });
    if (!anySet) {
      links.forEach(function (a) {
        var href = (a.getAttribute('href') || '').split('/').pop();
        if (href === here) a.setAttribute('aria-current', 'page');
      });
    }
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ---- Current year ---- */
  var y = document.querySelectorAll('[data-year]');
  var year = new Date().getFullYear();
  y.forEach(function (el) { el.textContent = year; });

  /* ---- Netlify forms: submit via fetch, show inline success ---- */
  var forms = document.querySelectorAll('form[data-netlify="true"]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      // Let Netlify handle it normally if fetch isn't available
      if (!window.fetch) return;
      e.preventDefault();
      var data = new FormData(form);
      var btn = form.querySelector('[type="submit"]');
      var success = form.parentNode.querySelector('.form__success');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      }).then(function () {
        if (success) {
          success.classList.add('is-visible');
          success.setAttribute('tabindex', '-1');
          success.focus();
        }
        form.reset();
        form.style.display = 'none';
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send'; }
        alert('Sorry — something went wrong sending your message. Please try again or email us directly.');
      });
    });
  });
})();

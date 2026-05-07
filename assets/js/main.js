// VUGA Publishing — minimal interaction layer
(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu toggle (disclosure pattern with keyboard support)
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-nav]');

  function closeMenu(returnFocus){
    if (!menu || !toggle) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }

  function openMenu(){
    if (!menu || !toggle) return;
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    const first = menu.querySelector('a');
    if (first) first.focus();
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('is-open');
      isOpen ? closeMenu(false) : openMenu();
    });
    // Escape closes menu and returns focus to toggle
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu(true);
      }
    });
    // Click outside closes
    document.addEventListener('click', e => {
      if (!menu.classList.contains('is-open')) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu(false);
    });
  }

  // Smooth-anchor offset for sticky header (respects reduced-motion)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({top: y, behavior: reduceMotion ? 'auto' : 'smooth'});
      // Move focus for screen reader / keyboard users
      if (t.tabIndex < 0) t.setAttribute('tabindex', '-1');
      t.focus({preventScroll: true});
    });
  });

  // Contact form: client-side validation + accessible status messaging
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', e => {
      const required = form.querySelectorAll('[required]');
      const missing = [];
      required.forEach(el => {
        if (!el.value.trim()) missing.push(el.getAttribute('data-label') || el.name);
      });
      if (missing.length && status) {
        e.preventDefault();
        status.textContent = 'Please complete the required field' + (missing.length > 1 ? 's' : '') + ': ' + missing.join(', ') + '.';
        status.classList.add('is-error');
        status.focus();
        const firstInvalid = form.querySelector('[required]:invalid, [required][value=""]');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }
})();

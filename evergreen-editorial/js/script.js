/* =========================================================
   EverGreen Estates — script.js

   Six features, one function each:
     1. Mobile navigation
     2. Scroll reveal (IntersectionObserver)
     3. Accordion
     4. Quote cross-fader (with autoplay)
     5. Collection filter
     6. Finder form + image fallback
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initAccordion();
  initQuotes();
  initFilter();
  initFinder();
  initImageFallback();
});


/* ---------- 1. MOBILE NAVIGATION ---------- */
function initNav() {
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');
  if (!burger || !nav) return;

  const setState = (open) => {
    nav.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  burger.addEventListener('click', () => {
    setState(!nav.classList.contains('is-open'));
  });

  // Close after choosing a destination
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setState(false));
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setState(false);
  });
}


/* ---------- 2. SCROLL REVEAL ----------
   IntersectionObserver fires when an element enters the
   viewport. Cheaper than listening to every scroll event.
   Elements are unobserved once shown so it runs only once. */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // Fallback for very old browsers — just show everything
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      // Small stagger so grouped items cascade in
      setTimeout(() => entry.target.classList.add('is-visible'), i * 70);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
}


/* ---------- 3. ACCORDION ----------
   CSS cannot transition to height:auto, so the panel's real
   scrollHeight is written to max-height in pixels. */
function initAccordion() {
  const items = [...document.querySelectorAll('.qa-item')];
  if (!items.length) return;

  const close = (item) => {
    item.classList.remove('is-open');
    item.querySelector('.qa-q').setAttribute('aria-expanded', 'false');
    item.querySelector('.qa-a').style.maxHeight = null;
  };

  const open = (item) => {
    const panel = item.querySelector('.qa-a');
    item.classList.add('is-open');
    item.querySelector('.qa-q').setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  };

  items.forEach(item => {
    if (item.classList.contains('is-open')) open(item);

    item.querySelector('.qa-q').addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      items.forEach(close);
      if (!wasOpen) open(item);
    });
  });

  window.addEventListener('resize', () => {
    const panel = document.querySelector('.qa-item.is-open .qa-a');
    if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
  });
}


/* ---------- 4. QUOTE CROSS-FADER ----------
   Stacked absolutely, only .is-active is visible.
   Autoplays every 7s and pauses on hover or focus. */
function initQuotes() {
  const stage = document.getElementById('quoteStage');
  if (!stage) return;

  const quotes = [...stage.querySelectorAll('.quote')];
  const now    = document.getElementById('quoteNow');
  const all    = document.getElementById('quoteAll');
  const prev   = document.getElementById('quotePrev');
  const next   = document.getElementById('quoteNext');

  let i = 0;
  let timer = null;
  if (all) all.textContent = quotes.length;

  const show = (n) => {
    i = (n + quotes.length) % quotes.length;
    quotes.forEach((q, idx) => q.classList.toggle('is-active', idx === i));
    if (now) now.textContent = i + 1;
  };

  const play  = () => { timer = setInterval(() => show(i + 1), 7000); };
  const pause = () => { clearInterval(timer); };

  if (prev) prev.addEventListener('click', () => { pause(); show(i - 1); play(); });
  if (next) next.addEventListener('click', () => { pause(); show(i + 1); play(); });

  stage.addEventListener('mouseenter', pause);
  stage.addEventListener('mouseleave', play);
  stage.addEventListener('focusin',  pause);
  stage.addEventListener('focusout', play);

  show(0);
  play();
}


/* ---------- 5. COLLECTION FILTER ----------
   Compares each button's data-filter to each card's
   data-type, and shows a note when nothing matches. */
function initFilter() {
  const buttons = [...document.querySelectorAll('.filter')];
  const cards   = [...document.querySelectorAll('.listing')];
  const note    = document.getElementById('emptyNote');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const want = btn.dataset.filter;
      let shown = 0;

      cards.forEach(card => {
        const match = want === 'all' || card.dataset.type === want;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });

      if (note) note.hidden = shown > 0;
    });
  });
}


/* ---------- 6a. FINDER FORM ----------
   Demo handler: stops the reload, reads the values, and
   scrolls the user down to the collection. */
function initFinder() {
  const form = document.getElementById('finder');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const query = Object.fromEntries(new FormData(form).entries());
    console.log('Search request:', query);

    const target = document.getElementById('collection');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}


/* ---------- 6b. IMAGE FALLBACK ----------
   The photographs are hotlinked from Unsplash. If one fails
   to load (offline, blocked network) the layout would show a
   broken icon, so swap in a neutral tone instead. */
function initImageFallback() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.background = 'var(--paper-deep)';
      img.style.minHeight = '200px';
      img.removeAttribute('src');
    });
  });
}

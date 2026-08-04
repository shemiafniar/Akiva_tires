/* Minimal JS for interactions, accessibility, and subtle animations */
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    const toggleNav = () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      navToggle.setAttribute('aria-expanded', String(next));
      navToggle.classList.toggle('open', next);
      navList.classList.toggle('open', next);
    };

    navToggle.addEventListener('click', toggleNav);

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        navList.classList.remove('open');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        navList.classList.remove('open');
      }
    });
  }

  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .card').forEach((el) => io.observe(el));

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const initHeroBackgroundSlider = () => {
    const slides = Array.from(document.querySelectorAll('.hero-bg-slide'));
    let currentIndex = 0;

    if (!slides.length) return;

    const setSlide = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, idx) => slide.classList.toggle('active', idx === currentIndex));
    };

    setSlide(0);
    setInterval(() => setSlide(currentIndex + 1), 3800);
  };

  initHeroBackgroundSlider();

  // Light-weight back to top visibility
  const floatingCall = document.querySelector('.floating-call');
  const showOn = 300;
  window.addEventListener('scroll', () => {
    if (!floatingCall) return;
    if (window.scrollY > showOn) floatingCall.classList.add('show'); else floatingCall.classList.remove('show');
  });
});

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

  const initPhotoSlider = () => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const dots = Array.from(document.querySelectorAll('.slider-dot'));
    let currentIndex = 0;
    let autoplay;

    if (!slides.length || !prevButton || !nextButton || !dots.length) return;

    const setSlide = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, idx) => slide.classList.toggle('active', idx === currentIndex));
      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
    };

    const nextSlide = () => setSlide(currentIndex + 1);
    const prevSlide = () => setSlide(currentIndex - 1);
    const resetAutoplay = () => {
      clearInterval(autoplay);
      autoplay = setInterval(nextSlide, 3200);
    };

    prevButton.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });

    nextButton.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });

    dots.forEach((dot, idx) => dot.addEventListener('click', () => {
      setSlide(idx);
      resetAutoplay();
    }));

    setSlide(0);
    resetAutoplay();
  };

  initPhotoSlider();

  // Light-weight back to top visibility
  const floatingCall = document.querySelector('.floating-call');
  const showOn = 300;
  window.addEventListener('scroll', () => {
    if (!floatingCall) return;
    if (window.scrollY > showOn) floatingCall.classList.add('show'); else floatingCall.classList.remove('show');
  });
});

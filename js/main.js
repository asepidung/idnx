/* ========================================
   IDNX Portfolio — Main JavaScript
   Asep Saepullah | saepullrock.tech
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initScrollReveal();
  initProjectFilter();
  initTypingEffect();
  initParticles();
  initBackToTop();
  initSkillBars();

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ========================================
   THEME MANAGEMENT
   ======================================== */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  // Tema awal sudah di-set oleh inline script di <head> (anti-flash)

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage diblokir */ }
      // Perbarui warna partikel untuk tema baru
      initParticles();
    });
  }
}

/* ========================================
   NAVBAR SCROLL EFFECT
   ======================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
  const burger = document.getElementById('navbar-burger');
  const overlay = document.getElementById('mobile-overlay');
  if (!burger || !overlay) return;

  const links = overlay.querySelectorAll('.mobile-overlay__link');

  const setOpen = open => {
    burger.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger.addEventListener('click', () => setOpen(!overlay.classList.contains('open')));
  links.forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) setOpen(false);
  });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href.length < 2) return; // href="#" bukan selector yang valid
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      history.replaceState(null, '', href);
    });
  });
}

/* ========================================
   ACTIVE NAV TRACKING
   ======================================== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ========================================
   SCROLL REVEAL (Intersection Observer)
   ======================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ========================================
   PROJECT FILTER
   ======================================== */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  if (buttons.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s var(--ease) forwards';
        } else {
          card.classList.add('hidden');
          card.style.animation = '';
        }
      });
    });
  });
}

/* ========================================
   TYPING EFFECT
   ======================================== */
function initTypingEffect() {
  const el = document.getElementById('typing-name');
  if (!el) return;

  const text = el.getAttribute('data-text') || '';
  const cursor = document.getElementById('typing-cursor');

  if (prefersReducedMotion()) {
    el.textContent = text;
    if (cursor) cursor.style.display = 'none';
    return;
  }

  el.textContent = '';

  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 60 + Math.random() * 30);
    } else {
      // Typing done — keep cursor blinking
      if (cursor) cursor.style.animationIterationCount = '8';
      setTimeout(() => {
        if (cursor) cursor.style.display = 'none';
      }, 4000);
    }
  }

  // Start after a small delay
  setTimeout(type, 400);
}

/* ========================================
   PARTICLE / CONSTELLATION CANVAS
   ======================================== */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas || prefersReducedMotion()) return;

  // Re-init (mis. saat ganti tema): cukup ganti warna, jangan bikin loop baru
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const color = isDark ? 'rgba(14, 165, 233,' : 'rgba(2, 132, 199,';
  if (canvas._state) {
    canvas._state.color = color;
    return;
  }

  const ctx = canvas.getContext('2d');
  const state = { color };
  canvas._state = state;

  const connectionDistance = 150;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let width = 0;
  let height = 0;
  let animationId = null;
  let inView = true;

  function resize() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticles() {
    const count = Math.min(60, Math.floor(width / 20));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${state.color}${p.opacity})`;
      ctx.fill();
    }

    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `${state.color}${opacity})`;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  // Hanya animasi saat hero terlihat & tab aktif — hemat CPU/baterai
  function syncRunning() {
    const shouldRun = inView && !document.hidden;
    if (shouldRun && animationId === null) {
      animationId = requestAnimationFrame(animate);
    } else if (!shouldRun && animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    syncRunning();
  }).observe(canvas);
  document.addEventListener('visibilitychange', syncRunning);

  resize();
  createParticles();
  syncRunning();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      createParticles();
    }, 200);
  });
}

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ========================================
   SKILL BARS ANIMATION
   ======================================== */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-item__fill');
  if (bars.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-item__fill');
          fills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            if (width) {
              fill.style.width = width;
            }
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe skill groups rather than individual bars
  document.querySelectorAll('.skill-group').forEach(group => {
    observer.observe(group);
  });
}

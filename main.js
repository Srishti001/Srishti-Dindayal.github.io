/* ─── main.js ─── */

// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// ─── Custom Cursor ───
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// Smooth trail
(function animTrail() {
  tx += (mx - tx) * 0.14;
  ty += (my - ty) * 0.14;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animTrail);
})();

// Cursor hover grow
document.querySelectorAll('a, button, .ap-card, .pb-card, .work-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '18px';
    cursor.style.height = '18px';
    trail.style.width   = '48px';
    trail.style.height  = '48px';
    trail.style.borderColor = 'var(--blush-mid)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    trail.style.width   = '32px';
    trail.style.height  = '32px';
    trail.style.borderColor = 'var(--orchid)';
  });
});

// ─── Nav scroll ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ─── Reveal on scroll ───
const revealItems = document.querySelectorAll('.reveal-item');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = [...entry.target.parentElement.children];
      const i = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (i * 0.1) + 's';
      entry.target.classList.add('revealed');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealItems.forEach(el => revealObs.observe(el));

// ─── Approach bars animate in ───
const apCards = document.querySelectorAll('.ap-card');
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // trigger CSS transition on --w
      const bar = entry.target.querySelector('.ap-bar');
      if (bar) {
        bar.style.setProperty('--w', bar.style.getPropertyValue('--w'));
      }
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
apCards.forEach(c => barObs.observe(c));

// ─── Smooth scroll for nav links ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Parallax orbs (subtle) ───
const orbs = document.querySelectorAll('.orb-1, .orb-2, .orb-3, .orb-4');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  orbs.forEach((orb, i) => {
    const speed = [0.08, 0.05, 0.06, 0.04][i] || 0.05;
    orb.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });

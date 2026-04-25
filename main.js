// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Resume button — check PDF exists, fallback to mailto if not
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
  fetch('resume.pdf', { method: 'HEAD' }).catch(() => {
    resumeBtn.href = 'mailto:srishti292001@gmail.com?subject=Resume Request';
    resumeBtn.removeAttribute('target');
    resumeBtn.title = 'Resume PDF coming soon — click to email me';
  });
}

// Smooth reveal on scroll — using CSS classes only (no inline transition override)
const style = document.createElement('style');
style.textContent = `
  .reveal-pending {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .reveal-pending.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

const revealEls = document.querySelectorAll(
  '.stat-card, .approach-step, .timeline-item, .project-card, .skill-group, .edu-card, .contact-card'
);

revealEls.forEach(el => el.classList.add('reveal-pending'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger by sibling index so cards in same row animate sequentially
      const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal-pending'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

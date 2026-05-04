/* ─────────────────────────────────────────
   REVEAL AU SCROLL
───────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ─────────────────────────────────────────
   ACTIVE LINK DANS LA NAV
   Met la classe "active" sur le lien correspondant
   à la page courante
───────────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

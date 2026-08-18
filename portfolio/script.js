/* ═══════════════════════════════════════════════════════════════
   BENJAMIN CROUZET — PORTFOLIO
   1. Apparition des blocs au défilement
   2. Lien actif dans la navigation
   3. Visionneuse plein écran pour les captures d'écran
═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   1. APPARITION AU DÉFILEMENT
───────────────────────────────────────── */
(function () {
  const cibles = document.querySelectorAll('.reveal');
  if (!cibles.length) return;

  // Si l'utilisateur a demandé moins d'animations, on affiche tout directement.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cibles.forEach(el => el.classList.add('visible'));
    return;
  }

  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach((entree, i) => {
      if (!entree.isIntersecting) return;
      setTimeout(() => entree.target.classList.add('visible'), i * 70);
      observateur.unobserve(entree.target); // une seule fois par bloc
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  cibles.forEach(el => observateur.observe(el));
})();

/* ─────────────────────────────────────────
   2. LIEN ACTIF DANS LA NAVIGATION
   Une page de Projets/ met "projets" en surbrillance.
───────────────────────────────────────── */
(function () {
  const chemin = window.location.pathname;
  const fichier = chemin.split('/').pop() || 'index.html';
  const dansProjets = /\/Projets\//i.test(chemin);

  document.querySelectorAll('.nav-links a').forEach(lien => {
    const cible = (lien.getAttribute('href') || '').split('/').pop();
    if (cible === fichier || (dansProjets && cible === 'projets.html')) {
      lien.classList.add('active');
    }
  });
})();

/* ─────────────────────────────────────────
   3. VISIONNEUSE PLEIN ÉCRAN
   Un clic sur une capture l'agrandit. Échap ou clic pour fermer.
───────────────────────────────────────── */
(function () {
  const images = document.querySelectorAll('.screenshot-block img');
  if (!images.length) return;

  const boite = document.createElement('div');
  boite.className = 'lightbox';
  boite.setAttribute('role', 'dialog');
  boite.setAttribute('aria-modal', 'true');
  boite.setAttribute('aria-hidden', 'true');
  boite.innerHTML = '<button class="lb-close" type="button" aria-label="Fermer">Fermer ✕</button><img alt="">';
  document.body.appendChild(boite);

  const grande = boite.querySelector('img');
  const bouton = boite.querySelector('.lb-close');
  let declencheur = null;

  function ouvrir(img) {
    declencheur = img;
    grande.src = img.currentSrc || img.src;
    grande.alt = img.alt || '';
    boite.classList.add('open');
    boite.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    bouton.focus();
  }

  function fermer() {
    boite.classList.remove('open');
    boite.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (declencheur) declencheur.focus();
  }

  images.forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.addEventListener('click', () => ouvrir(img));
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ouvrir(img); }
    });
  });

  boite.addEventListener('click', fermer);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && boite.classList.contains('open')) fermer();
  });
})();

const SELECTORS = [
  'section.section > .container > *',
  'section.section-sm > .container > *',
  '.portfolio-card',
  '.service-block',
  '.sb-feature',
  '.faq-item',
  '.stat-card',
  '.team-card',
  '.footer-brand',
  '.footer-links-group',
].join(', ');

export function initScrollReveal() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  const scan = () => {
    document.querySelectorAll(SELECTORS).forEach((el, i) => {
      if (el.dataset.revealDone) return;
      el.dataset.revealDone = '1';

      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 6) * 0.07}s`;

      if (alreadyVisible) {
        // Already in (or above) the viewport on load — reveal on next frame instead
        // of waiting on the observer, so above-the-fold content never gets stuck hidden.
        requestAnimationFrame(() => el.classList.add('reveal-in'));
      } else {
        observer.observe(el);
        // Safety net: if the observer never fires (edge cases with late layout/
        // lazy content), force-reveal so content can never stay permanently hidden.
        setTimeout(() => {
          if (!el.classList.contains('reveal-in')) {
            el.classList.add('reveal-in');
            observer.unobserve(el);
          }
        }, 3000);
      }
    });
  };

  scan();
  const mo = new MutationObserver(scan);
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    mo.disconnect();
  };
}

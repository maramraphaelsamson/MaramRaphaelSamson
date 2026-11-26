(function () {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const progress = document.querySelector('.scroll-progress');
  const year = document.querySelector('#year');

  if (year) year.textContent = String(new Date().getFullYear());

  // Keep the career goal broad: full-stack ability matters, but the role need not be full-stack.
  const careerGoal = document.querySelector('#about .about-copy p:last-of-type');
  if (careerGoal) {
    careerGoal.textContent = 'I’m looking for an opportunity where I can contribute my full-stack skills, work collaboratively with a team, and keep learning and growing alongside others.';
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('is-open');
      });
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll('.reveal').forEach(function (element) { observer.observe(element); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (element) { element.classList.add('is-visible'); });
  }

  if (progress) {
    let queued = false;
    const updateProgress = function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        progress.style.transform = 'scaleX(' + Math.min(100, Math.max(0, percent)) / 100 + ')';
        queued = false;
      });
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }
})();

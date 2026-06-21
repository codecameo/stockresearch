/* ============================================================
   THESIS — Marketing Site Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky nav border on scroll ── */
  const nav = document.querySelector('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Drag-to-scroll screenshot strip ── */
  const scroller = document.querySelector('.screenshots-scroll-outer');
  if (scroller) {
    let isDown = false, startX = 0, scrollLeft = 0;

    scroller.addEventListener('mousedown', e => {
      isDown = true;
      scroller.classList.add('dragging');
      startX = e.pageX - scroller.offsetLeft;
      scrollLeft = scroller.scrollLeft;
    });
    document.addEventListener('mouseup', () => {
      isDown = false;
      scroller.classList.remove('dragging');
    });
    scroller.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      scroller.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });
  }

  /* ── Fade-up scroll animations ── */
  const fadeTargets = document.querySelectorAll(
    '.layer-card, .step, .report-tab, .comparison-col, .proof-item'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.55s ease ${(i % 4) * 80}ms, transform 0.55s ease ${(i % 4) * 80}ms`;
    fadeObserver.observe(el);
  });


  /* ── Smooth anchor scroll for nav CTA ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

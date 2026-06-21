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

  /* ── Animate layer fill bars on hero visible ── */
  const layerFills = document.querySelectorAll('.layer-fill');
  const layerWidths = ['92%', '88%', '95%', '79%', '85%'];

  const layerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        layerFills.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = layerWidths[i] || '80%';
          }, i * 120);
        });
        layerObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const layersPreview = document.querySelector('.layers-preview');
  if (layersPreview) layerObserver.observe(layersPreview);

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

  /* ── Typewriter ticker cycle in hero phone mockup ── */
  const tickers = [
    { ticker: 'AAPL', company: 'Apple Inc.', verdict: 'STRONG BUY', conviction: '91%', fairValue: '$218.40', margin: '+14.2%', signal: 'strong-buy' },
    { ticker: 'NVDA', company: 'NVIDIA Corp.', verdict: 'BUY', conviction: '84%', fairValue: '$142.60', margin: '+9.8%', signal: 'buy' },
    { ticker: 'MSFT', company: 'Microsoft Corp.', verdict: 'BUY', conviction: '79%', fairValue: '$468.20', margin: '+11.3%', signal: 'buy' },
    { ticker: 'TSLA', company: 'Tesla Inc.', verdict: 'HOLD', conviction: '58%', fairValue: '$194.00', margin: '+2.1%', signal: 'hold' },
  ];

  let tickerIndex = 0;

  const tickerEl    = document.getElementById('mock-ticker');
  const companyEl   = document.getElementById('mock-company');
  const verdictEl   = document.getElementById('mock-verdict');
  const verdictDot  = document.getElementById('mock-verdict-dot');
  const convEl      = document.getElementById('mock-conviction');
  const fvEl        = document.getElementById('mock-fair-value');
  const marginEl    = document.getElementById('mock-margin');

  const verdictColors = {
    'strong-buy': { text: '#22C55E', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)' },
    'buy':        { text: '#4ADE80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.3)' },
    'hold':       { text: '#9CA3AF', bg: 'rgba(156,163,175,0.12)', border: 'rgba(156,163,175,0.3)' },
    'sell':       { text: '#F97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)' },
    'strong-sell':{ text: '#EF4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)' },
  };

  function updateMockup(data) {
    if (!tickerEl) return;
    const col = verdictColors[data.signal];

    tickerEl.textContent  = data.ticker;
    companyEl.textContent = data.company;
    verdictEl.textContent = data.verdict;
    convEl.textContent    = data.conviction;
    fvEl.textContent      = data.fairValue;
    marginEl.textContent  = data.margin;

    verdictEl.style.color        = col.text;
    verdictDot.style.background  = col.text;

    const badge = verdictEl.closest('.report-verdict');
    if (badge) {
      badge.style.background   = col.bg;
      badge.style.borderColor  = col.border;
    }
  }

  function rotateTicker() {
    tickerIndex = (tickerIndex + 1) % tickers.length;
    updateMockup(tickers[tickerIndex]);
  }

  if (tickerEl) {
    updateMockup(tickers[0]);
    setInterval(rotateTicker, 3200);
  }

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

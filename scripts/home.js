

// Animation on scroll (staggered reveals)
function revealOnScroll() {
  const elements = document.querySelectorAll('.reason-card, .service-card');
  const windowHeight = window.innerHeight;

  elements.forEach((el, i) => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < windowHeight - 100) {
      // staggered delay for a nicer sequential reveal
      el.style.transitionDelay = `${(i % 6) * 80}ms`;
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);



    // Show button when scrolled down
window.onscroll = function() {
  document.getElementById("backToTop").style.display =
    (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200)
    ? "block" : "none";
  };
  // Scroll to top on click
document.getElementById("backToTop").onclick = function() {
  window.scrollTo({top: 0, behavior: 'smooth'});
};


function  redirectToWhatsApp() {
  const phoneRaw = "+254 725 023365"; // keep human readable format here
  const phone = phoneRaw.replace(/\D/g, ''); 
  const text = "Hello, how are you?";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isMobile
    ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// Courses horizontal navigation (prev/next buttons, indicators and responsive behaviour)
(function() {
  const container = document.querySelector('.courses-row');
  const prevBtn = document.querySelector('.courses-prev');
  const nextBtn = document.querySelector('.courses-next');
  const leftFade = document.querySelector('.scroll-fade.left');
  const rightFade = document.querySelector('.scroll-fade.right');
  const indicators = document.querySelector('.courses-indicators');
  if (!container) return;

  let cards = Array.from(container.querySelectorAll('.course-card'));
  let dots = [];

  const rebuildIndicators = () => {
    if (!indicators) return;
    cards = Array.from(container.querySelectorAll('.course-card'));
    indicators.innerHTML = '';
    dots = [];
    cards.forEach((card, i) => {
      const btn = document.createElement('button');
      btn.className = 'courses-dot';
      btn.setAttribute('aria-label', `View course ${i + 1}`);
      btn.setAttribute('role', 'tab');
      btn.addEventListener('click', () => {
        container.scrollTo({ left: computeLeftForIndex(i), behavior: 'smooth' });
      });
      indicators.appendChild(btn);
      dots.push(btn);
    });
  };

  const computeLeftForIndex = (i) => {
    const card = cards[i];
    if (!card) return 0;
    return Math.max(0, card.offsetLeft - Math.round((container.clientWidth - card.clientWidth) / 2));
  };

  const updateActiveDot = () => {
    if (!indicators || !dots.length) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    let nearest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < minDist) { minDist = dist; nearest = i; }
    });
    dots.forEach((dot, i) => {
      if (i === nearest) { dot.classList.add('active'); dot.setAttribute('aria-current', 'true'); }
      else { dot.classList.remove('active'); dot.removeAttribute('aria-current'); }
    });
  };

  const isDesktop = () => window.innerWidth >= 992;
  const canScroll = () => container.scrollWidth > container.clientWidth + 1;

  const update = () => {
    const maxScroll = container.scrollWidth - container.clientWidth - 1;
    const atStart = container.scrollLeft <= 5;
    const atEnd = container.scrollLeft >= maxScroll;

    if (leftFade) leftFade.style.opacity = canScroll() && !atStart ? '1' : '0';
    if (rightFade) rightFade.style.opacity = canScroll() && !atEnd ? '1' : '0';

    if (prevBtn && nextBtn) {
      if (isDesktop() && canScroll()) {
        prevBtn.style.display = atStart ? 'none' : 'flex';
        nextBtn.style.display = atEnd ? 'none' : 'flex';
        prevBtn.disabled = atStart;
        nextBtn.disabled = atEnd;
      } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }
    }

    if (indicators) {
      indicators.style.display = canScroll() ? 'flex' : 'none';
      if (canScroll()) updateActiveDot();
    }
  };

  const scrollByAmount = () => {
    const card = container.querySelector('.course-card');
    if (card) return Math.round(card.clientWidth + parseInt(getComputedStyle(container).gap || 16));
    return Math.round(container.clientWidth * 0.8);
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { container.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' }); });
  if (nextBtn) nextBtn.addEventListener('click', () => { container.scrollBy({ left: scrollByAmount(), behavior: 'smooth' }); });

  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') container.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
    if (e.key === 'ArrowRight') container.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
  });

  container.addEventListener('scroll', () => { window.requestAnimationFrame(update); });

  window.addEventListener('resize', () => { window.requestAnimationFrame(() => { rebuildIndicators(); update(); }); });
  window.addEventListener('load', () => { rebuildIndicators(); update(); });
  setTimeout(() => { rebuildIndicators(); update(); }, 200);

  // initialize
  rebuildIndicators(); update();
})();
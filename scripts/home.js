

// Animation on scroll
function revealOnScroll() {
  const cards = document.querySelectorAll('.reason-card');
  const windowHeight = window.innerHeight;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < windowHeight - 100) {
      card.classList.add('visible');
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
  const phone = "+254 725 023365"; 
  const text = "Hello, how are you?"; 
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isMobile
    ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}
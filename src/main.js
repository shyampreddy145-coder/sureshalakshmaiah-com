import { initNavbar } from './components/navbar.js';
import { initFooter } from './components/footer.js';

// Initialize Reusable Components
initNavbar();
initFooter();

// ─── Google Analytics ───────────────────────────────────────────
// To activate: Replace 'G-XXXXXXXXXX' below with your real Measurement ID
// ─────────────────────────────────────────────────────────────────
const GA_ID = 'G-XXXXXXXXXX';
if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
  // Load the gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_ID);
}

// Scroll Animation Logic (Intersection Observer)
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15 // Trigger when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Optional: Stop observing once animated
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// Testimonial Carousel Logic
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

if (track && prevBtn && nextBtn) {
  const slidesCount = track.children.length;
  let currentSlide = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slidesCount;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
    updateCarousel();
  });

  // Optional auto-slide
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slidesCount;
    updateCarousel();
  }, 8000);
}

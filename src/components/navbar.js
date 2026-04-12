/**
 * Reusable Navbar Component
 * Standardizing the header across all pages.
 */

export const navbarTemplate = `
  <nav class="navbar scrolled" id="navbar">
    <div class="container">
      <a href="/" class="nav-brand" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
        <img src="/sl-favicon.png" alt="SL Logo" style="height: 32px; width: 32px; border-radius: 4px;">
        <span class="text-gradient" style="font-size: 1.5rem; font-weight: 700;">Suresha Lakshmaiah</span>
      </a>
      <div class="nav-links">
        <a href="/#home" data-nav="home">Home</a>
        <a href="/#about" data-nav="about">About</a>
        <a href="/#services" data-nav="services">Services</a>
        <a href="/#speaking" data-nav="speaking">Speaking</a>
        <a href="/blog/" data-nav="blog">Blog</a>
        <a href="/contact/" data-nav="contact">Contact</a>
      </div>
      <a href="/#contact" class="btn btn-primary">Book a Free Consultation</a>
    </div>
  </nav>
`;

export function initNavbar() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    navbarPlaceholder.innerHTML = navbarTemplate;

    // Highlight active link based on current path
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (currentPath === linkPath || (currentPath === '/' && linkPath === '/#home')) {
        link.classList.add('active');
      }
    });

    // Handle scroll background (this logic was previously in main.js, but good to ensure here)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

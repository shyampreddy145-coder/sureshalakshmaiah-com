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
      
      <!-- Hamburger Icon for Mobile -->
      <button class="mobile-menu-btn" aria-label="Toggle Menu" style="background: none; border: none; font-size: 1.8rem; color: var(--text-primary); cursor: pointer; display: none;">
        <i class="ph-bold ph-list" id="menu-icon"></i>
      </button>

      <div class="nav-links" id="nav-links">
        <a href="/#home" data-nav="home">Home</a>
        <a href="/#about" data-nav="about">About</a>
        <a href="/#services" data-nav="services">Services</a>
        <a href="/#speaking" data-nav="speaking">Speaking</a>
        <a href="/blog/" data-nav="blog">Blog</a>
        <a href="/contact/" data-nav="contact">Contact</a>
        <!-- CTA included inside the menu for mobile view -->
        <a href="/#contact" class="btn btn-primary mobile-cta" style="display: none; text-align: center; margin-top: 1rem;">Book a Free Consultation</a>
      </div>
      
      <a href="/#contact" class="btn btn-primary desktop-cta">Book a Free Consultation</a>
    </div>
  </nav>
`;

export function initNavbar() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    navbarPlaceholder.innerHTML = navbarTemplate;

    // Highlight active link based on current path
    const currentPath = window.location.pathname;
    const navLinksList = document.querySelectorAll('.nav-links a:not(.mobile-cta)');
    
    navLinksList.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (currentPath === linkPath || (currentPath === '/' && linkPath === '/#home')) {
        link.classList.add('active');
      }
    });

    // Mobile Menu Toggle Logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileBtn && navLinksContainer) {
      mobileBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        if (navLinksContainer.classList.contains('active')) {
          menuIcon.classList.replace('ph-list', 'ph-x');
        } else {
          menuIcon.classList.replace('ph-x', 'ph-list');
        }
      });
      
      // Close menu when clicking a link on mobile
      const links = navLinksContainer.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          navLinksContainer.classList.remove('active');
          if (menuIcon) menuIcon.classList.replace('ph-x', 'ph-list');
        });
      });
    }

    // Handle scroll background
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

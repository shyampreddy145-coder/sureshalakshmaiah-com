/**
 * Reusable Footer Component
 * Managing navigation and social links in one place.
 */

export const footerTemplate = `
  <footer class="footer">
    <div class="container">
      <div class="footer-nav">
        <a href="/">Home</a>
        <a href="/#about">About</a>
        <a href="/#services">Services</a>
        <a href="/blog/">Blog</a>
        <a href="/contact/">Contact</a>
        <a href="/privacy/">Privacy Policy</a>
      </div>
      <div class="social-icons" style="justify-content: center;">
        <a href="https://in.linkedin.com/in/suresha-lakshmaiah" target="_blank" class="social-icon" title="LinkedIn"><i class="ph-fill ph-linkedin-logo"></i></a>
        <a href="#" class="social-icon" title="X"><i class="ph-fill ph-x-logo"></i></a>
        <a href="https://www.instagram.com/sureshalakshmaiah/?hl=en" target="_blank" class="social-icon" title="Instagram"><i class="ph-fill ph-instagram-logo"></i></a>
        <a href="https://www.facebook.com/sureshalakshmaiaha" target="_blank" class="social-icon" title="Facebook"><i class="ph-fill ph-facebook-logo"></i></a>
        <a href="#" class="social-icon" title="YouTube"><i class="ph-fill ph-youtube-logo"></i></a>
        <a href="mailto:sl@sureshalakshmaiah.com" class="social-icon" title="Email"><i class="ph-fill ph-envelope-simple"></i></a>
      </div>
      <p class="copyright">© 2026 SureshaLakshmaiah.com. All rights reserved.</p>
    </div>
  </footer>
`;

export function initFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerTemplate;
  }
}

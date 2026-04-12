export function generateBlogHTML({ title, author, date, readTime, tag, imagePath, content }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/sl-favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Suresha Lakshmaiah</title>
  <meta name="description" content="A comprehensive insight by Suresha Lakshmaiah." />
  <link rel="stylesheet" href="/src/style.css">
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <style>
    body { background-color: var(--bg-secondary); }
    .blog-hero { padding-top: 8rem; padding-bottom: 2rem; background: var(--bg-primary); }
    .blog-container { max-width: 800px; margin: 0 auto; padding: 0 1.5rem; }
    .blog-content { padding: 4rem 0; font-size: 1.15rem; line-height: 1.9; color: #333; }
    .blog-content h2 { margin-top: 3rem; margin-bottom: 1.5rem; font-size: 2rem; color: var(--text-primary); }
    .blog-content p { margin-bottom: 1.8rem; }
    .blog-content blockquote { font-size: 1.5rem; font-weight: 500; font-style: italic; border-left: 4px solid #dd1818; padding-left: 1.5rem; margin: 3rem 0; color: var(--text-primary); }
  </style>
</head>
<body>
  <!-- 1. Navbar -->
  <div id="navbar-placeholder"></div>

  <!-- 2. Editorial Hero -->
  <header class="blog-hero">
    <div class="blog-container text-center">
      <span class="text-gradient" style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1.5rem; display: inline-block;">${tag}</span>
      <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.15; margin-bottom: 2rem; color: var(--text-primary);">${title}</h1>
      
      <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 3rem;">
        <img src="/assets/media__1775592460510.jpg" alt="${author}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #eaeaea;">
        <div style="text-align: left;">
          <p style="margin: 0; font-weight: 600; color: var(--text-primary); font-size: 0.95rem;">${author}</p>
          <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">${date} • ${readTime} min read</p>
        </div>
      </div>
    </div>
  </header>

  <!-- 3. Featured Image -->
  <div style="background: var(--bg-primary);">
    <div class="blog-container">
      <img src="${imagePath}" alt="${title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 8px; box-shadow: var(--shadow-soft);">
    </div>
  </div>

  <!-- 4. Blog Content -->
  <main class="blog-container blog-content">
    ${content}
  </main>

  <!-- 5. Final CTA -->
  <section class="section-padding bg-light text-center" style="border-top: 1px solid #eaeaea; background: var(--bg-primary);">
    <div class="container animate-on-scroll">
      <h2 class="text-gradient">Ready to push forward?</h2>
      <p style="max-width: 600px; margin: 0 auto 2rem;">If this resonated with you, let's explore implementing an execution framework together.</p>
      <a href="/#contact" class="btn btn-primary">Schedule a Strategy Session</a>
    </div>
  </section>

  <!-- 6. Footer -->
  <div id="footer-placeholder"></div>

  <script type="module" src="/src/main.js"></script>
</body>
</html>`;
}






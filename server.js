import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateBlogHTML } from './blogTemplate.js';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve all static files (HTML, CSS, JS, images) from project root
app.use(express.static(__dirname));

// Bulletproof routing for main pages (handles /privacy as well as /privacy/)
const mainPages = ['privacy', 'contact', 'blog'];
mainPages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, page, 'index.html'));
  });
});

// Ensure assets directory exists
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

// Set up image upload to /assets
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, assetsDir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, 'blog_upload_' + Date.now() + ext)
  }
});
const upload = multer({ storage: storage });

// Admin Authentication Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Hardcoded for CMS basic setup as asked
  const adminUser = process.env.ADMIN_USER || 'slakshmaiah';
  const adminPass = process.env.ADMIN_PASS || 'Suresha!2026Strong$';
  
  if (username === adminUser && password === adminPass) {
    res.json({ success: true, token: 'super-secret-local-token' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Blog Publishing Route
app.post('/api/publish', upload.single('heroImage'), (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token !== 'Bearer super-secret-local-token') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, tag, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Missing content' });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // 1. Generate image path
    let imagePath = 'assets/' + (req.file ? req.file.filename : 'blog_featured_1775588286438.png');

    // 2. Generate Date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const readTime = Math.max(1, Math.ceil(content.split(' ').length / 200));

    // 3. Create full HTML
    const html = generateBlogHTML({
      title,
      author: 'Suresha Lakshmaiah',
      date: dateStr,
      readTime,
      tag: tag || 'INSIGHTS',
      // Using leading slash for absolute route loading when placed in subdirectories
      imagePath: '/' + imagePath,
      content
    });

    // 4. Create directory and save index.html
    const dirPath = path.join(__dirname, 'blog', slug);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf-8');

    // 5. Inject into main index.html grid
    const indexPath = path.join(__dirname, 'index.html');
    let indexHtml = fs.readFileSync(indexPath, 'utf-8');

    const newCardHtml = `
          <!-- Dynamically Added Card via CMS -->
          <div style="display: flex; flex-direction: column;">
            <span class="text-gradient" style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.75rem; width: fit-content;">${tag || 'INSIGHTS'}</span>
            <h4 style="font-size: 1.25rem; color: #111; line-height: 1.3; margin-bottom: 1rem; flex-grow: 1;">${title}</h4>
            <a href="/blog/${slug}/" style="font-size: 0.85rem; font-weight: 700; color: #111; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; transition: color 0.2s;">Read More <i class="ph-bold ph-arrow-right"></i></a>
            <img src="${imagePath}" alt="${title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; border-radius: 4px;">
          </div>`;

    const insertionPoint = '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem;">';
    indexHtml = indexHtml.replace(insertionPoint, insertionPoint + "\n" + newCardHtml);
    fs.writeFileSync(indexPath, indexHtml, 'utf-8');

    // 6. Inject into blog/index.html (Archive Page) grid
    const archivePath = path.join(__dirname, 'blog', 'index.html');
    if (fs.existsSync(archivePath)) {
      let archiveHtml = fs.readFileSync(archivePath, 'utf-8');
      archiveHtml = archiveHtml.replace(insertionPoint, insertionPoint + "\n" + newCardHtml);
      fs.writeFileSync(archivePath, archiveHtml, 'utf-8');
    }

    res.json({ success: true, slug });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`\x1b[32m✔ CMS Backend is running at http://localhost:${port}\x1b[0m`);
});

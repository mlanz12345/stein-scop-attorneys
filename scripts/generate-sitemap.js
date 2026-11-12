import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const baseUrl = 'https://www.steinscop.com';
const today = new Date().toISOString().split('T')[0];

const teamCode = fs.readFileSync(path.join(rootDir, 'src/data/team.ts'), 'utf8');

const teamIds = [...teamCode.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/practice-areas', priority: '0.9', changefreq: 'weekly' },
  { path: '/team', priority: '0.9', changefreq: 'weekly' },
  { path: '/careers', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const page of staticPages) {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
}

for (const id of teamIds) {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}/team/${id}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '    <changefreq>monthly</changefreq>\n';
  xml += '    <priority>0.7</priority>\n';
  xml += '  </url>\n';
}

xml += '</urlset>\n';

fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), xml);
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
}
console.log(`[SEO] Sitemap successfully generated with ${staticPages.length + teamIds.length} URLs in public/sitemap.xml & dist/sitemap.xml`);

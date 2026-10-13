import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const baseUrl = 'https://www.steinscop.com';

const teamCode = fs.readFileSync(path.join(rootDir, 'src/data/team.ts'), 'utf8');
const articlesCode = fs.readFileSync(path.join(rootDir, 'src/data/articles.ts'), 'utf8');

const teamIds = [...teamCode.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
const articleSlugs = [...articlesCode.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);

const staticPages = [
  '/',
  '/about',
  '/practice-areas',
  '/team',
  '/insights',
  '/careers',
  '/contact',
];

const allRoutes = [
  ...staticPages,
  ...teamIds.map(id => `/team/${id}`),
  ...articleSlugs.map(slug => `/insights/${slug}`),
];

async function prerender() {
  const ssrEntryPath = path.join(rootDir, 'dist-ssr/entry-server.js');
  if (!fs.existsSync(ssrEntryPath)) {
    console.error(`[Pre-render] SSR bundle not found at ${ssrEntryPath}. Run vite build --ssr first.`);
    process.exit(1);
  }

  const { render } = await import(ssrEntryPath);
  const templatePath = path.join(rootDir, 'dist/index.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  console.log(`[Pre-render] Starting static pre-rendering for ${allRoutes.length} routes...`);

  let renderedCount = 0;

  for (const route of allRoutes) {
    try {
      const { html } = render(route);

      // Extract title and meta tags from rendered HTML
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : 'Stein Scop Attorneys';

      const metaTags = [...html.matchAll(/<meta\s+[^>]+>/g)].map(m => m[0]);
      const canonicalTag = `<link rel="canonical" href="${baseUrl}${route === '/' ? '' : route}" />`;

      // Inject into template
      let pageHtml = template;

      // Replace title
      pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

      // Inject meta tags and canonical before </head>
      const metaInjection = `\n    ${canonicalTag}\n    ${metaTags.join('\n    ')}\n  `;
      pageHtml = pageHtml.replace('</head>', `${metaInjection}</head>`);

      // Inject rendered markup into #root
      pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

      // Determine output paths
      if (route === '/') {
        fs.writeFileSync(templatePath, pageHtml, 'utf8');
      } else {
        const routeDir = path.join(rootDir, 'dist', route.slice(1));
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, 'index.html'), pageHtml, 'utf8');
        fs.writeFileSync(path.join(rootDir, 'dist', `${route.slice(1)}.html`), pageHtml, 'utf8');
      }

      renderedCount++;
    } catch (err) {
      console.error(`[Pre-render] Error rendering route ${route}:`, err);
    }
  }

  console.log(`[Pre-render] Successfully pre-rendered ${renderedCount}/${allRoutes.length} pages into dist/`);

  // Clean up temporary dist-ssr directory
  try {
    fs.rmSync(path.join(rootDir, 'dist-ssr'), { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors
  }
}

prerender().catch(err => {
  console.error('[Pre-render] Fatal error during pre-rendering:', err);
  process.exit(1);
});

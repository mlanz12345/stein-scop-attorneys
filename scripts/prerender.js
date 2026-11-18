import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const baseUrl = 'https://www.steinscop.com';

const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3ltaeqqw',
  dataset: process.env.VITE_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

function getOgImageUrl(imageSource) {
  if (!imageSource || !imageSource.asset) return `${baseUrl}/logo-new.png`;
  try {
    return builder.image(imageSource).width(1200).height(630).fit('crop').auto('format').quality(85).url();
  } catch {
    return `${baseUrl}/logo-new.png`;
  }
}

const teamCode = fs.readFileSync(path.join(rootDir, 'src/data/team.ts'), 'utf8');
const teamIds = [...teamCode.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);

const staticPages = [
  '/',
  '/about',
  '/practice-areas',
  '/team',
  '/careers',
  '/contact',
  '/privacy',
  '/404',
];

const allRoutes = [
  ...staticPages,
  ...teamIds.map(id => `/team/${id}`),
];

function unescapeHtmlEntities(str) {
  if (!str) return '';
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function escapeHtmlAttr(str) {
  if (!str) return '';
  return unescapeHtmlEntities(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildLawFirmJsonLd(siteSettings) {
  const firmName = siteSettings?.firmName || 'Stein Scop Attorneys Inc.';
  const telephone = siteSettings?.telephone || '+27 11 380 8080';
  const email = siteSettings?.infoEmail || 'info@steinscop.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    '@id': `${baseUrl}/#organization`,
    name: firmName,
    url: baseUrl,
    logo: `${baseUrl}/logo-new.png`,
    image: `${baseUrl}/room.png`,
    telephone,
    email,
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Second Floor, Capital Hill, 6 Benmore Road, Morningside',
      addressLocality: 'Sandton',
      addressRegion: 'Gauteng',
      postalCode: '2057',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -26.0987,
      longitude: 28.0534,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    areaServed: ['South Africa', 'Nigeria', 'Zambia', 'Zimbabwe', 'Democratic Republic of the Congo', 'Mozambique'],
  };

  if (siteSettings?.linkedinUrl) {
    schema.sameAs = [siteSettings.linkedinUrl];
  }

  return JSON.stringify(schema);
}

function buildBreadcrumbJsonLd(route, attorney) {
  if (route === '/' || route === '/404') return null;

  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
  ];

  const routeNames = {
    '/about': 'About',
    '/practice-areas': 'Practice Areas',
    '/team': 'Our Team',
    '/careers': 'Careers',
    '/contact': 'Contact',
    '/privacy': 'Privacy & PAIA',
  };

  if (route.startsWith('/team/') && attorney) {
    items.push({ '@type': 'ListItem', position: 2, name: 'Our Team', item: `${baseUrl}/team` });
    items.push({ '@type': 'ListItem', position: 3, name: attorney.name, item: `${baseUrl}${route}` });
  } else {
    const label = routeNames[route] || route.replace(/^\//, '');
    items.push({ '@type': 'ListItem', position: 2, name: label, item: `${baseUrl}${route}` });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  });
}

function buildAttorneyJsonLd(attorney, routeUrl) {
  if (!attorney) return null;
  let portraitUrl = `${baseUrl}/logo-new.png`;
  if (attorney.image?.asset) {
    portraitUrl = builder.image(attorney.image).width(800).height(1000).fit('crop').auto('format').url();
  } else if (typeof attorney.image === 'string' && attorney.image) {
    portraitUrl = attorney.image.startsWith('http') ? attorney.image : `${baseUrl}${attorney.image}`;
  }

  const bioText = Array.isArray(attorney.bio) ? attorney.bio[0] : attorney.bio;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${routeUrl}#person`,
    name: attorney.name,
    jobTitle: attorney.title || 'Attorney',
    url: routeUrl,
    image: portraitUrl,
    email: attorney.email || 'info@steinscop.com',
    description: bioText || `${attorney.name} — ${attorney.title} at Stein Scop Attorneys Inc.`,
    worksFor: {
      '@type': 'LegalService',
      '@id': `${baseUrl}/#organization`,
      name: 'Stein Scop Attorneys Inc.',
      url: baseUrl,
    },
    knowsAbout: attorney.practiceAreas || [],
  };

  if (attorney.qualifications) {
    schema.hasCredential = {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: attorney.qualifications,
    };
  }

  const linkedinProfile = attorney.linkedinUrl || attorney.linkedin;
  if (linkedinProfile) {
    schema.sameAs = [linkedinProfile];
  }

  return JSON.stringify(schema);
}

async function fetchSanitySeoData() {
  try {
    console.log('[Pre-render] Fetching live SEO metadata & structured data from Sanity...');
    const data = await sanityClient.fetch(`{
      "siteSettings": *[_type == "siteSettings"][0],
      "pages": *[_type == "page"]{ "slug": slug.current, title, heroTitle, heroSubtitle, seo },
      "attorneys": *[_type == "attorney"]{ "slug": slug.current, name, title, qualifications, email, practiceAreas, bio, image, seo }
    }`);
    console.log(`[Pre-render] Connected to Sanity: loaded ${data.pages?.length || 0} pages & ${data.attorneys?.length || 0} attorney profiles.`);
    return data;
  } catch (err) {
    console.warn('[Pre-render] Sanity fetch unavailable (using static fallback metadata):', err.message);
    return { siteSettings: null, pages: [], attorneys: [] };
  }
}

async function prerender() {
  const ssrEntryPath = path.join(rootDir, 'dist-ssr/entry-server.js');
  if (!fs.existsSync(ssrEntryPath)) {
    console.error(`[Pre-render] SSR bundle not found at ${ssrEntryPath}. Run vite build --ssr first.`);
    process.exit(1);
  }

  const sanityData = await fetchSanitySeoData();
  const siteSettings = sanityData.siteSettings;

  // Sync robots.txt from Sanity if defined
  if (siteSettings?.robotsTxt?.trim()) {
    try {
      const robotsPath = path.join(rootDir, 'public/robots.txt');
      fs.writeFileSync(robotsPath, siteSettings.robotsTxt.trim() + '\n', 'utf8');
      const distRobotsPath = path.join(rootDir, 'dist/robots.txt');
      if (fs.existsSync(path.join(rootDir, 'dist'))) {
        fs.writeFileSync(distRobotsPath, siteSettings.robotsTxt.trim() + '\n', 'utf8');
      }
      console.log('[SEO] Custom robots.txt synced from Sanity into public/ and dist/');
    } catch (err) {
      console.warn('[SEO] Failed to sync robots.txt from Sanity:', err);
    }
  }
  const pageMap = new Map((sanityData.pages || []).map(p => [p.slug === 'home' ? '/' : `/${p.slug}`, p]));
  const sanityAttorneyMap = new Map((sanityData.attorneys || []).map(a => [`/team/${a.slug}`, a]));

  const { render, teamMembers = [] } = await import(ssrEntryPath);
  const localAttorneyMap = new Map(teamMembers.map(m => [`/team/${m.id}`, m]));

  const templatePath = path.join(rootDir, 'dist/index.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  console.log(`[Pre-render] Starting static pre-rendering for ${allRoutes.length} routes...`);

  let renderedCount = 0;

  for (const route of allRoutes) {
    try {
      const { html } = render(route);

      const sanityPage = pageMap.get(route);
      const localAttorney = localAttorneyMap.get(route);
      const sanityAttorney = sanityAttorneyMap.get(route);
      const mergedAttorney = (localAttorney || sanityAttorney)
        ? { ...localAttorney, ...sanityAttorney, image: sanityAttorney?.image || localAttorney?.image }
        : null;

      const sanitySeo = sanityPage?.seo || sanityAttorney?.seo;
      const defaultSeo = siteSettings?.defaultSeo;

      // 1. Resolve Title (Sanity override -> React Helmet -> Site Default)
      const helmetTitleMatch = html.match(/<title>([^<]+)<\/title>/);
      const helmetTitle = helmetTitleMatch ? unescapeHtmlEntities(helmetTitleMatch[1]) : 'Stein Scop Attorneys';
      const finalTitle = sanitySeo?.metaTitle || helmetTitle || defaultSeo?.metaTitle || 'Stein Scop Attorneys';

      // 2. Resolve Description
      const helmetDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
      const helmetDesc = helmetDescMatch ? unescapeHtmlEntities(helmetDescMatch[1]) : '';
      const finalDesc = sanitySeo?.metaDescription || helmetDesc || defaultSeo?.metaDescription || '';

      // 3. Resolve Canonical URL
      const defaultRouteUrl = `${baseUrl}${route === '/' ? '' : route}`;
      const finalCanonical = sanitySeo?.canonicalUrl || defaultRouteUrl;

      // 4. Resolve OpenGraph Image
      let ogImageUrl = `${baseUrl}/logo-new.png`;
      if (sanitySeo?.ogImage?.asset) {
        ogImageUrl = getOgImageUrl(sanitySeo.ogImage);
      } else if (sanityAttorney?.image?.asset) {
        ogImageUrl = getOgImageUrl(sanityAttorney.image);
      } else if (typeof localAttorney?.image === 'string' && localAttorney.image) {
        ogImageUrl = `${baseUrl}${localAttorney.image}`;
      } else if (defaultSeo?.ogImage?.asset) {
        ogImageUrl = getOgImageUrl(defaultSeo.ogImage);
      }

      // 5. Resolve Robots & Keywords
      const noIndex = sanitySeo?.noIndex ?? defaultSeo?.noIndex ?? false;
      const robotsTag = `<meta name="robots" content="${noIndex ? 'noindex, nofollow' : 'index, follow'}" />`;
      const keywords = sanitySeo?.keywords || defaultSeo?.keywords || [];
      const keywordsTag = keywords.length > 0
        ? `<meta name="keywords" content="${escapeHtmlAttr(keywords.join(', '))}" />`
        : '';

      // 6. Google Search Console Verification & Google Analytics / GTM
      const rawGsc = siteSettings?.googleSiteVerification?.trim() || 'jIYet-YQeDqd2ymKePJMEivj8N9cSyJB6aDUFJVuStk';
      const gscContentMatch = rawGsc.match(/content=["']([^"']+)["']/i);
      const cleanGsc = gscContentMatch ? gscContentMatch[1] : rawGsc;
      const gscTag = cleanGsc
        ? `<meta name="google-site-verification" content="${escapeHtmlAttr(cleanGsc)}" />`
        : '';

      const rawGa = (siteSettings?.googleAnalyticsId || process.env.VITE_GA_MEASUREMENT_ID || 'GTM-NCVSCLRN').trim();
      const gtmMatch = rawGa.match(/\b(GTM-[A-Z0-9]+)\b/i);
      const gtagMatch = rawGa.match(/\b((?:G|GT|AW|UA)-[A-Z0-9-]+)\b/i);
      let gaHeadTags = '';
      let gtmBodyNoscript = '';
      if (gtmMatch) {
        const gtmId = gtmMatch[1].toUpperCase();
        gaHeadTags = `<script>
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
      (function() {
        var loaded = false;
        function loadGtm() {
          if (loaded) return;
          loaded = true;
          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtm.js?id=${gtmId}';
          document.head.appendChild(s);
        }
        if ('requestIdleCallback' in window) {
          requestIdleCallback(function() { setTimeout(loadGtm, 800); }, { timeout: 2500 });
        } else {
          setTimeout(loadGtm, 1000);
        }
        ['scroll', 'pointerdown', 'touchstart', 'keydown'].forEach(function(evt) {
          window.addEventListener(evt, loadGtm, { once: true, passive: true });
        });
      })();
    </script>`;
        gtmBodyNoscript = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;
      } else if (gtagMatch) {
        const gaId = gtagMatch[1].toUpperCase();
        gaHeadTags = `<script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
      (function() {
        var loaded = false;
        function loadGtag() {
          if (loaded) return;
          loaded = true;
          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtag/js?id=${gaId}';
          document.head.appendChild(s);
        }
        if ('requestIdleCallback' in window) {
          requestIdleCallback(function() { setTimeout(loadGtag, 800); }, { timeout: 2500 });
        } else {
          setTimeout(loadGtag, 1000);
        }
        ['scroll', 'pointerdown', 'touchstart', 'keydown'].forEach(function(evt) {
          window.addEventListener(evt, loadGtag, { once: true, passive: true });
        });
      })();
    </script>`;
      }

      // 7. JSON-LD Structured Data (Custom Override OR Automatic LawFirm / Attorney Schema)
      let jsonLdString = sanitySeo?.structuredData?.trim() || '';
      if (!jsonLdString) {
        if (mergedAttorney) {
          jsonLdString = buildAttorneyJsonLd(mergedAttorney, defaultRouteUrl);
        } else {
          jsonLdString = buildLawFirmJsonLd(siteSettings);
        }
      }
      const breadcrumbJsonLd = buildBreadcrumbJsonLd(route, mergedAttorney);
      const breadcrumbTag = breadcrumbJsonLd
        ? `<script type="application/ld+json">${breadcrumbJsonLd}</script>`
        : '';
      const jsonLdTag = [
        jsonLdString ? `<script type="application/ld+json">${jsonLdString}</script>` : '',
        breadcrumbTag,
      ]
        .filter(Boolean)
        .join('\n  ');

      // Build complete SEO head tags
      const headTags = [
        `<link rel="canonical" href="${escapeHtmlAttr(finalCanonical)}" />`,
        robotsTag,
        `<meta name="description" content="${escapeHtmlAttr(finalDesc)}" />`,
        keywordsTag,
        gscTag,
        gaHeadTags,
        `<meta property="og:title" content="${escapeHtmlAttr(finalTitle)}" />`,
        `<meta property="og:description" content="${escapeHtmlAttr(finalDesc)}" />`,
        `<meta property="og:url" content="${escapeHtmlAttr(finalCanonical)}" />`,
        `<meta property="og:type" content="${mergedAttorney ? 'profile' : 'website'}" />`,
        `<meta property="og:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${escapeHtmlAttr(finalTitle)}" />`,
        `<meta name="twitter:description" content="${escapeHtmlAttr(finalDesc)}" />`,
        `<meta name="twitter:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
        jsonLdTag,
      ].filter(Boolean).join('\n    ');

      // Inject into template
      let pageHtml = template;
      pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${escapeHtmlAttr(finalTitle)}</title>`);
      pageHtml = pageHtml.replace('</head>', `\n    ${headTags}\n  </head>`);
      if (gtmBodyNoscript) {
        pageHtml = pageHtml.replace('<body>', `<body>\n    ${gtmBodyNoscript}`);
      }

      // Strip duplicate inline <title> and <meta> tags inside #root emitted by React Helmet SSR
      const cleanedHtml = html
        .replace(/<title>.*?<\/title>/gi, '')
        .replace(/<meta\s+[^>]+>/gi, '')
        .replace(/opacity:\s*0(?=[;"])/gi, 'opacity:1')
        .replace(/clip-path:\s*inset\([^)]+\)/gi, 'clip-path:none');

      // Inject rendered markup into #root
      pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${cleanedHtml}</div>`);

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


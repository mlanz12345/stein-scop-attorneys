import type { VercelRequest, VercelResponse } from '@vercel/node';

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || '3ltaeqqw';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_API_VERSION = '2024-01-01';

const DEFAULT_ROBOTS = `User-agent: *
Allow: /

Sitemap: https://www.steinscop.com/sitemap.xml
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const query = encodeURIComponent(`*[_type == "siteSettings"][0].robotsTxt`);
    const sanityUrl = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;

    const sanityRes = await fetch(sanityUrl, {
      headers: { 'Accept': 'application/json' },
    });

    if (sanityRes.ok) {
      const data = await sanityRes.json();
      const customRobots = data?.result;

      if (customRobots && typeof customRobots === 'string' && customRobots.trim().length > 0) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
        return res.status(200).send(customRobots.trim() + '\n');
      }
    }
  } catch (err) {
    console.warn('[robots.txt] Failed to fetch custom robots from Sanity, serving default:', err);
  }

  // Fallback to default
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
  return res.status(200).send(DEFAULT_ROBOTS);
}

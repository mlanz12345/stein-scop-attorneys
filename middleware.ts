const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || '3ltaeqqw';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_API_VERSION = '2024-01-01';

interface SanityRedirect {
  source: string;
  destination: string;
  permanent?: boolean;
}

// In-memory cache for edge runtime with 60s TTL
let cachedRedirects: SanityRedirect[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000;

async function fetchRedirects(): Promise<SanityRedirect[]> {
  const now = Date.now();
  if (cachedRedirects && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedRedirects;
  }

  try {
    const query = encodeURIComponent(
      `*[_type == "redirect" && defined(source) && defined(destination)]{ source, destination, permanent }`
    );
    const sanityUrl = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;
    const res = await fetch(sanityUrl);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.result)) {
        cachedRedirects = data.result;
        lastFetchTime = now;
        return cachedRedirects;
      }
    }
  } catch (err) {
    console.warn('[Middleware] Failed to fetch redirects from Sanity:', err);
  }

  return cachedRedirects || [];
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - static assets with extensions (.png, .jpg, .css, .js, .svg, .ico, etc.)
     * - root /
     */
    '/((?!api|_next|assets|.*\\.[\\w]+$).*)',
  ],
};

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname.toLowerCase();

  if (pathname === '/' || pathname === '') {
    return;
  }

  const redirects = await fetchRedirects();
  if (!redirects || redirects.length === 0) {
    return;
  }

  const cleanPath = pathname.replace(/\/+$/, '');

  const match = redirects.find((r) => {
    if (!r.source) return false;
    const src = r.source.trim().toLowerCase().replace(/\/+$/, '');
    return src === cleanPath || src === pathname;
  });

  if (match && match.destination) {
    const dest = match.destination.trim();
    const destinationUrl =
      dest.startsWith('http://') || dest.startsWith('https://')
        ? dest
        : new URL(dest.startsWith('/') ? dest : `/${dest}`, url.origin).toString();

    const status = match.permanent !== false ? 301 : 302;
    return Response.redirect(destinationUrl, status);
  }
}

import { client, isSanityConfigured } from './client';
import { 
  PAGE_SEO_QUERY, 
  ATTORNEYS_QUERY, 
  ATTORNEY_BY_SLUG_QUERY, 
  PRACTICE_AREAS_QUERY, 
  CAREER_PROGRAMMES_QUERY,
  SITE_SETTINGS_QUERY,
  REDIRECTS_QUERY
} from './queries';
import { allMembers } from '../data/team';

export interface PageSeoData {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImageUrl?: string;
  ogImageAlt?: string;
  keywords?: string[];
  structuredData?: string;
  heroTag?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

/**
 * Fetches SEO and hero content for a specific page slug.
 * If Sanity is not configured or an error occurs, returns undefined to use hardcoded defaults.
 */
export async function getPageSeo(slug: string): Promise<PageSeoData | null> {
  if (!isSanityConfigured()) return null;

  try {
    const data = await client.fetch(PAGE_SEO_QUERY, { slug });
    if (!data) return null;
    return {
      metaTitle: data.seo?.metaTitle,
      metaDescription: data.seo?.metaDescription,
      canonicalUrl: data.seo?.canonicalUrl,
      noIndex: data.seo?.noIndex,
      ogImageUrl: data.seo?.ogImageUrl,
      ogImageAlt: data.seo?.ogImageAlt,
      keywords: data.seo?.keywords,
      structuredData: data.seo?.structuredData,
      heroTag: data.heroTag,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
    };
  } catch (err) {
    console.warn(`[Sanity] Could not fetch SEO for slug "${slug}":`, err);
    return null;
  }
}

/**
 * Fetches all attorneys from Sanity.
 * Falls back to local `teamMembers` from `src/data/team.ts` if Sanity is unconfigured.
 */
export async function getAttorneys() {
  if (!isSanityConfigured()) {
    return allMembers;
  }

  try {
    const data = await client.fetch(ATTORNEYS_QUERY);
    if (!data || data.length === 0) return allMembers;
    return data;
  } catch (err) {
    console.warn('[Sanity] Could not fetch attorneys, using local team data:', err);
    return allMembers;
  }
}

/**
 * Fetches an individual attorney by slug with custom SEO tags.
 */
export async function getAttorneyBySlug(slug: string) {
  if (!isSanityConfigured()) {
    return allMembers.find((m) => m.id === slug) || null;
  }

  try {
    const data = await client.fetch(ATTORNEY_BY_SLUG_QUERY, { slug });
    if (!data) {
      return allMembers.find((m) => m.id === slug) || null;
    }
    return data;
  } catch (err) {
    console.warn(`[Sanity] Could not fetch attorney "${slug}":`, err);
    return allMembers.find((m) => m.id === slug) || null;
  }
}

/**
 * Fetches global site settings from Sanity.
 */
export async function getSiteSettings() {
  if (!isSanityConfigured()) return null;

  try {
    return await client.fetch(SITE_SETTINGS_QUERY);
  } catch (err) {
    console.warn('[Sanity] Could not fetch site settings:', err);
    return null;
  }
}

export interface CareerProgrammeData {
  _id?: string;
  title: string;
  slug: string;
  statusBadge?: string;
  location?: string;
  duration?: string;
  audience?: string;
  notice?: string;
  description: string;
  admissionsEmail?: string;
  emailSubject?: string;
  emailBody?: string;
  active?: boolean;
  order?: number;
}

/**
 * Fetches active career programmes and openings from Sanity.
 */
export async function getCareerProgrammes(): Promise<CareerProgrammeData[] | null> {
  if (!isSanityConfigured()) return null;

  try {
    const data = await client.fetch(CAREER_PROGRAMMES_QUERY);
    if (!data || data.length === 0) return null;
    return data;
  } catch (err) {
    console.warn('[Sanity] Could not fetch career programmes:', err);
    return null;
  }
}

export interface RedirectData {
  _id?: string;
  source: string;
  destination: string;
  permanent?: boolean;
}

/**
 * Fetches active URL redirects from Sanity.
 */
export async function getRedirects(): Promise<RedirectData[] | null> {
  if (!isSanityConfigured()) return null;

  try {
    const data = await client.fetch(REDIRECTS_QUERY);
    if (!data || data.length === 0) return null;
    return data;
  } catch (err) {
    console.warn('[Sanity] Could not fetch redirects:', err);
    return null;
  }
}


import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

/**
 * Determines if a source object or string represents a Sanity image asset.
 * Returns false for static local assets like '/glenn.png'.
 */
export function isSanityAsset(source: any): boolean {
  if (!source) return false;
  if (typeof source === 'string') {
    return source.startsWith('image-');
  }
  return Boolean(source._type === 'image' || source.asset || source._ref);
}

/**
 * Low-level Sanity image builder.
 * Allows custom chaining with all Sanity image pipeline methods.
 */
export function urlFor(source: any) {
  if (!isSanityAsset(source)) return null;
  return builder.image(source);
}

export interface OpenGraphImageOptions {
  width?: number;
  height?: number;
  fit?: 'crop' | 'clip' | 'fill' | 'max' | 'min';
  format?: 'jpg' | 'png' | 'webp';
  quality?: number;
}

/**
 * Generates an optimized, standard OpenGraph image URL for social media sharing
 * (LinkedIn, WhatsApp, Facebook, X / Twitter).
 * Default dimensions: 1200 x 630 px (1.91:1 ratio) with hotspot focal-point awareness.
 */
export function urlForOpenGraph(
  source: any,
  options: OpenGraphImageOptions = {}
): string | null {
  if (!isSanityAsset(source)) return null;

  const {
    width = 1200,
    height = 630,
    fit = 'crop',
    format = 'jpg', // JPG is universally supported across all social media scrapers
    quality = 90,
  } = options;

  try {
    const img = builder
      .image(source)
      .width(width)
      .height(height)
      .fit(fit)
      .crop('focalpoint')
      .format(format)
      .quality(quality);

    return img.url();
  } catch (err) {
    console.warn('[Sanity Image] Error building OpenGraph URL:', err);
    return null;
  }
}

/**
 * Returns a guaranteed absolute OpenGraph image URL.
 * Prioritizes Sanity 1200x630 generated URL, then existing absolute URL, then local path with domain prefix.
 */
export function getSocialShareImageUrl(
  source: any,
  fallbackLocalPath: string = '/logo-new.png',
  baseUrl: string = 'https://www.steinscop.com'
): string {
  if (isSanityAsset(source)) {
    const sanityOg = urlForOpenGraph(source);
    if (sanityOg) return sanityOg;
  }

  if (typeof source === 'string') {
    if (source.startsWith('http://') || source.startsWith('https://')) {
      return source;
    }
    if (source.startsWith('/')) {
      return `${baseUrl}${source}`;
    }
  }

  return fallbackLocalPath.startsWith('http') ? fallbackLocalPath : `${baseUrl}${fallbackLocalPath}`;
}

export interface PortraitImageOptions {
  width?: number;
  height?: number;
  dpr?: 1 | 2 | 3;
  quality?: number;
  format?: 'webp' | 'png' | 'jpg';
}

/**
 * Generates an attorney portrait image URL tuned to Stein Scop's standard 379x470 px proportions.
 * Supports Retina/high-DPI multipliers (dpr: 1, 2, or 3).
 */
export function urlForPortrait(
  source: any,
  options: PortraitImageOptions = {}
): string | null {
  if (!isSanityAsset(source)) return null;

  const {
    width = 379,
    height = 470,
    dpr = 1,
    quality = 88,
    format = 'webp',
  } = options;

  try {
    return builder
      .image(source)
      .width(width * dpr)
      .height(height * dpr)
      .fit('crop')
      .crop('focalpoint')
      .format(format)
      .quality(quality)
      .url();
  } catch (err) {
    console.warn('[Sanity Image] Error building Portrait URL:', err);
    return null;
  }
}

export interface MediaImageOptions {
  width?: number;
  height?: number;
  aspectRatio?: number; // e.g. 16/9, 4/3
  fit?: 'crop' | 'clip' | 'fill' | 'max' | 'min';
  quality?: number;
  autoFormat?: boolean;
}

/**
 * General-purpose media asset builder for practice areas, case studies, and hero images.
 * Defaults to auto-format (serving modern AVIF/WebP depending on client support).
 */
export function urlForMedia(
  source: any,
  options: MediaImageOptions = {}
): string | null {
  if (!isSanityAsset(source)) return null;

  const {
    width,
    height,
    aspectRatio,
    fit = 'crop',
    quality = 85,
    autoFormat = true,
  } = options;

  try {
    let img = builder.image(source).fit(fit).quality(quality);

    if (autoFormat) {
      img = img.auto('format');
    }

    if (width && height) {
      img = img.width(width).height(height);
    } else if (width && aspectRatio) {
      img = img.width(width).height(Math.round(width / aspectRatio));
    } else if (width) {
      img = img.width(width);
    } else if (height) {
      img = img.height(height);
    }

    return img.url();
  } catch (err) {
    console.warn('[Sanity Image] Error building Media URL:', err);
    return null;
  }
}

export interface ResponsiveImageSet {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

/**
 * Builds responsive `srcSet` and `src` for modern HTML5 `<img>` or `<picture>` elements.
 * Generates progressive breakpoints for high-density mobile and desktop screens.
 */
export function getResponsiveImageSet(
  source: any,
  baseWidth: number,
  baseHeight: number,
  widths: number[] = [320, 480, 640, 768, 1024, 1280, 1600]
): ResponsiveImageSet | null {
  if (!isSanityAsset(source)) return null;

  try {
    const aspectRatio = baseWidth / baseHeight;

    // Filter breakpoints up to 2x the base width to prevent unnecessary upscaling
    const targetWidths = widths.filter((w) => w <= baseWidth * 2.5);
    if (!targetWidths.includes(baseWidth)) {
      targetWidths.push(baseWidth);
      targetWidths.sort((a, b) => a - b);
    }

    const srcSet = targetWidths
      .map((w) => {
        const h = Math.round(w / aspectRatio);
        const url = builder
          .image(source)
          .width(w)
          .height(h)
          .fit('crop')
          .crop('focalpoint')
          .auto('format')
          .quality(85)
          .url();
        return `${url} ${w}w`;
      })
      .join(', ');

    const defaultSrc = builder
      .image(source)
      .width(baseWidth)
      .height(baseHeight)
      .fit('crop')
      .crop('focalpoint')
      .auto('format')
      .quality(88)
      .url();

    return {
      src: defaultSrc,
      srcSet,
      width: baseWidth,
      height: baseHeight,
    };
  } catch (err) {
    console.warn('[Sanity Image] Error generating responsive image set:', err);
    return null;
  }
}

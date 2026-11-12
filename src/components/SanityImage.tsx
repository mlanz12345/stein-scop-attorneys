import React from 'react';
import { getResponsiveImageSet, urlForMedia } from '../sanity/image';

export interface SanityImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  source?: any;
  fallbackSrc?: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Modern, responsive image component with Sanity CDN integration and local fallback.
 * Automatically generates WebP/AVIF srcSet, avoids Cumulative Layout Shift (CLS),
 * and handles lazy loading with async decoding.
 */
export const SanityImage: React.FC<SanityImageProps> = ({
  source,
  fallbackSrc,
  width,
  height,
  alt,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  ...props
}) => {
  // If a valid Sanity image source is provided, generate responsive set
  if (source) {
    const responsive = getResponsiveImageSet(source, width, height);
    if (responsive) {
      return (
        <img
          src={responsive.src}
          srcSet={responsive.srcSet}
          sizes={sizes}
          width={width}
          height={height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={className}
          {...props}
        />
      );
    }

    const singleUrl = urlForMedia(source, { width, height });
    if (singleUrl) {
      return (
        <img
          src={singleUrl}
          width={width}
          height={height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={className}
          {...props}
        />
      );
    }
  }

  // Fallback to local static asset
  const resolvedSrc = fallbackSrc || '/logo-new.png';

  return (
    <img
      src={resolvedSrc}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      {...props}
    />
  );
};

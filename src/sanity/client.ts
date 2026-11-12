import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Reads from Vite environment variables (or process.env during SSR pre-rendering)
const getEnvVar = (key: string, fallback: string = ''): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return fallback;
};

export const projectId = getEnvVar('VITE_SANITY_PROJECT_ID', '3ltaeqqw');
export const dataset = getEnvVar('VITE_SANITY_DATASET', 'production');
export const apiVersion = getEnvVar('VITE_SANITY_API_VERSION', '2024-01-01');

/**
 * Returns true if a valid Project ID has been provided.
 * When false, the site gracefully falls back to local data and defaults.
 */
export const isSanityConfigured = (): boolean => {
  return Boolean(projectId && projectId !== 'your_project_id_here' && projectId.trim() !== '');
};

export const client = createClient({
  projectId: projectId || 'unconfigured',
  dataset,
  apiVersion,
  useCdn: false, // Fetch fresh published data immediately when SEO specialist clicks Publish
});


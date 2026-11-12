import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || '3ltaeqqw',
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  },
  studioHost: 'steinscop',
  deployment: {
    appId: 'l1avmowyrrhpxr720o5wbfb5',
  },
});

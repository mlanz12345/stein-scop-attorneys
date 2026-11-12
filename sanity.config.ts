import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media'; // 1. Import the media plugin
import { schemaTypes } from './sanity/schemas';

// 2. Next.js requires variables to start with NEXT_PUBLIC_ to be exposed to the browser/studio
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3ltaeqqw';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'stein-scop-studio',
  title: 'Stein Scop Attorneys — Content & SEO Studio',

  projectId,
  dataset,

  plugins: [
    structureTool(),
    media(), // 3. Add media() here to enable your global media library tab
  ],

  schema: {
    types: schemaTypes,
  },
});

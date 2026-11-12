import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const configPath = '/Users/maurizio/.config/sanity/config.json';
if (!fs.existsSync(configPath)) {
  console.error('Sanity configuration not found at', configPath);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const token = config.authToken;

if (!token) {
  console.error('No authToken found in Sanity config');
  process.exit(1);
}

const client = createClient({
  projectId: '3ltaeqqw',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: token,
  useCdn: false,
});

async function run() {
  console.log('--- Connecting to Sanity project 3ltaeqqw ---');
  
  // 1. Fetch all attorneys from Sanity
  const existingAttorneys = await client.fetch(`*[_type == "attorney"]{ _id, name, "slug": slug.current, image }`);
  console.log(`Found ${existingAttorneys.length} attorney documents in Sanity.`);

  // 2. Read src/data/team.ts to match each attorney with their image file
  const teamFilePath = path.join(rootDir, 'src/data/team.ts');
  const teamContent = fs.readFileSync(teamFilePath, 'utf8');

  // Match all members: id, name, image
  const memberMatches = [...teamContent.matchAll(/id:\s*'([^']+)',\s*name:\s*'([^']+)'(?:(?!image:).)*?image:\s*'\/([^']+)'/gs)];
  
  console.log(`Extracted ${memberMatches.length} team members from src/data/team.ts.`);

  const imageMap = new Map();
  for (const m of memberMatches) {
    const id = m[1];
    const imageFilename = m[3].split('?')[0];
    imageMap.set(id, imageFilename);
  }

  // 3. Upload images and link them to attorney documents
  const targetSlugs = process.argv.slice(2);
  let successCount = 0;

  for (const attorney of existingAttorneys) {
    const slug = attorney.slug;
    if (targetSlugs.length > 0 && !targetSlugs.includes(slug)) {
      continue;
    }
    const imageFilename = imageMap.get(slug);

    if (!imageFilename) {
      console.warn(`[SKIP] No image mapping found in team.ts for attorney: ${attorney.name} (slug: ${slug})`);
      continue;
    }

    const localImagePath = path.join(rootDir, 'public', imageFilename);
    if (!fs.existsSync(localImagePath)) {
      console.warn(`[MISSING] Image file does not exist: ${localImagePath}`);
      continue;
    }

    try {
      console.log(`Uploading ${imageFilename} for ${attorney.name}...`);
      const fileStream = fs.createReadStream(localImagePath);
      const asset = await client.assets.upload('image', fileStream, {
        filename: imageFilename,
        contentType: imageFilename.endsWith('.png') ? 'image/png' : 'image/jpeg',
      });

      console.log(`  -> Asset created: ${asset._id}. Patching document ${attorney._id}...`);
      await client
        .patch(attorney._id)
        .set({
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit();

      console.log(`  -> Successfully linked portrait for ${attorney.name}!`);
      successCount++;
    } catch (err) {
      console.error(`  -> Failed for ${attorney.name}:`, err.message);
    }
  }

  console.log(`\n=== COMPLETED: ${successCount}/${existingAttorneys.length} attorney portraits uploaded and linked in Sanity ===\n`);
}

run().catch(err => {
  console.error('Fatal error in sync script:', err);
  process.exit(1);
});

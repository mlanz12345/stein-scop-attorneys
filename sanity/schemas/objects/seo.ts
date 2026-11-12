import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'The title tag shown in search engine results and browser tabs (recommended: 50–60 characters). Format: Page Title | Stein Scop Attorneys',
      validation: (Rule) =>
        Rule.max(65).warning('Meta titles longer than 60 characters may be truncated by Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'The snippet text shown below the title in search engine results (recommended: 140–160 characters).',
      validation: (Rule) =>
        Rule.max(165).warning('Meta descriptions longer than 160 characters may be truncated by Google.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (OpenGraph / LinkedIn)',
      type: 'image',
      description: 'Image displayed when this link is shared on LinkedIn, WhatsApp, X, or Facebook (recommended: 1200 x 630 px).',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility and social cards (e.g. "Stein Scop Attorneys Sandton Office")',
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      description: 'Leave blank to use the standard page URL. Only set if this page should point to a canonical duplicate elsewhere.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Exclude from Search Engines (noindex)',
      type: 'boolean',
      description: 'Turn ON if you do NOT want Google to index this page.',
      initialValue: false,
    }),
    defineField({
      name: 'keywords',
      title: 'Target Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Primary and secondary target keywords tracked by the SEO specialist.',
    }),
    defineField({
      name: 'structuredData',
      title: 'Custom JSON-LD Structured Data (Optional Override)',
      type: 'text',
      rows: 6,
      description: 'Optional raw JSON-LD schema object. Leave blank to use the automatic LawFirm / Attorney Schema.org generator.',
    }),
  ],
});

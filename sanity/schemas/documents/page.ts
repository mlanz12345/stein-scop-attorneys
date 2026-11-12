import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Pages & SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Name',
      type: 'string',
      description: 'Internal name (e.g. "Homepage", "About Us", "Contact")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page Slug / Path',
      type: 'slug',
      description: 'The route URL (e.g. "about", "practice-areas", "careers", "contact", or "home" for root)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      description: 'Search engine and social sharing metadata for this page',
    }),
    defineField({
      name: 'heroTag',
      title: 'Hero Category Tag',
      type: 'string',
      description: 'The gold uppercase tracking tag above the main heading (e.g. "Connect", "Specializations")',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main display title in the hero section',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle / Description',
      type: 'text',
      rows: 3,
      description: 'Introductory paragraph below the main title',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'seo.ogImage',
    },
  },
});

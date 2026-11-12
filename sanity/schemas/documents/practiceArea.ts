import { defineType, defineField } from 'sanity';

export const practiceArea = defineType({
  name: 'practiceArea',
  title: 'Practice Areas',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Practice Area Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Category Tag',
      type: 'string',
      description: 'Short uppercase badge (e.g. "Advisory", "Dispute", "Regulatory")',
    }),
    defineField({
      name: 'detail',
      title: 'Scope / Sub-label',
      type: 'string',
      description: 'e.g. "Cross-Border & Domestic", "High Court & Arbitration"',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Editorial description explaining the firm’s capabilities in this area',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image Alt Text (SEO & Accessibility)',
          type: 'string',
          description: 'e.g. "Corporate Mergers and Acquisitions Law — Stein Scop Attorneys"',
        }),
      ],
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Feature on Homepage Sticky Stack',
      type: 'boolean',
      initialValue: true,
      description: 'Display this practice area in the homepage interactive carousel',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'detail',
      media: 'image',
    },
  },
});

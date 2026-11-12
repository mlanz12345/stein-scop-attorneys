import { defineType, defineField } from 'sanity';

export const attorney = defineType({
  name: 'attorney',
  title: 'Attorneys & Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Profile URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Role / Designation',
      type: 'string',
      options: {
        list: [
          { title: 'Director', value: 'Director' },
          { title: 'Consultant', value: 'Consultant' },
          { title: 'Senior Associate', value: 'Senior Associate' },
          { title: 'Associate', value: 'Associate' },
          { title: 'Candidate Attorney', value: 'Candidate Attorney' },
          { title: 'Management', value: 'Management' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'qualifications',
      title: 'Academic Qualifications',
      type: 'string',
      description: 'e.g. BCom Law; LLB (cum laude)',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@steinscop.com',
    }),
    defineField({
      name: 'practiceAreas',
      title: 'Practice Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Specialisations displayed on the profile card (leave empty for Candidate Attorneys)',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 6,
      description: 'Full professional biography',
    }),
    defineField({
      name: 'image',
      title: 'Portrait Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Portrait Alt Text (SEO & Accessibility)',
          type: 'string',
          description: 'e.g. "Glenn Stein — Co-Founding Director at Stein Scop Attorneys Sandton"',
        }),
      ],
      description: 'Studio monochrome portrait on white background',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Numeric order for sorting roster cards within their category',
    }),
    defineField({
      name: 'seo',
      title: 'Profile SEO Settings',
      type: 'seo',
      description: 'Custom SEO title, description, and share image for this attorney profile page',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
});

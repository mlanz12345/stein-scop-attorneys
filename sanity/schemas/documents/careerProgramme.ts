import { defineType, defineField } from 'sanity';

export const careerProgramme = defineType({
  name: 'careerProgramme',
  title: 'Careers & Programmes',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Programme / Position Title',
      type: 'string',
      description: 'e.g. "Articles of Clerkship", "Winter Vacation Programme", or "Associate — Corporate & Commercial"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Programme Code / Slug',
      type: 'slug',
      description: 'Used for the Apply Now form link (e.g. "articles-2028", "winter-vac-2027")',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statusBadge',
      title: 'Intake / Status Badge',
      type: 'string',
      description: 'Amber status pill next to the title (e.g. "2027 Closed · 2028 Open" or "Applications Open")',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Sandton',
      description: 'e.g. "Sandton"',
    }),
    defineField({
      name: 'duration',
      title: 'Contract / Programme Type',
      type: 'string',
      description: 'e.g. "Two-Year Contract", "Vacation Programme", "Full-Time"',
    }),
    defineField({
      name: 'audience',
      title: 'Target Candidate Level',
      type: 'string',
      description: 'e.g. "Candidate Attorney", "Law Students", "Admitted Attorney"',
    }),
    defineField({
      name: 'notice',
      title: 'Opening Notice (Bold Line)',
      type: 'string',
      description: 'Optional bold notice at the top of the card (e.g. "Kindly note that applications for articles of clerkship commencing in 2027 have closed.")',
    }),
    defineField({
      name: 'description',
      title: 'Description & Application Instructions',
      type: 'text',
      rows: 4,
      description: 'Main text explaining how and when to apply',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'admissionsEmail',
      title: 'Application Email Address',
      type: 'string',
      initialValue: 'admissions@steinscop.com',
    }),
    defineField({
      name: 'emailSubject',
      title: 'Direct Email Subject Line',
      type: 'string',
      description: 'e.g. "Application: Articles of Clerkship 2028"',
    }),
    defineField({
      name: 'emailBody',
      title: 'Direct Email Pre-filled Body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'active',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
      description: 'Turn OFF to hide this programme/opening from the Careers page without deleting it',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'statusBadge',
    },
  },
});

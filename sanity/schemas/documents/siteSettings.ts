import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Global Firm Settings & SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'firmName',
      title: 'Firm Name',
      type: 'string',
      initialValue: 'Stein Scop Attorneys Inc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO & Social Sharing',
      type: 'seo',
      description: 'Fallback title, description, and share image when an individual page has not specified one',
    }),
    defineField({
      name: 'telephone',
      title: 'Primary Telephone',
      type: 'string',
      initialValue: '+27 (0)11 380 80 80',
    }),
    defineField({
      name: 'infoEmail',
      title: 'General Enquiries Email',
      type: 'string',
      initialValue: 'info@steinscop.com',
    }),
    defineField({
      name: 'admissionsEmail',
      title: 'Graduate Admissions Email',
      type: 'string',
      initialValue: 'admissions@steinscop.com',
    }),
    defineField({
      name: 'physicalAddress',
      title: 'Physical Address',
      type: 'text',
      rows: 3,
      initialValue: 'Second Floor, Capital Hill\n6 Benmore Road, Morningside\nSandton, Gauteng, 2057',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
      initialValue: 'Monday — Friday: 08:00 — 17:00',
    }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Search Console Verification Code',
      type: 'string',
      description: 'Paste the content string from the <meta name="google-site-verification" content="..." /> tag.',
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics / GTM ID',
      type: 'string',
      description: 'Optional GA4 Measurement ID (e.g. G-XXXXXXXXXX) or Google Tag Manager ID (e.g. GTM-XXXXXXX).',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'Firm LinkedIn URL',
      type: 'url',
      description: 'Official Stein Scop Attorneys LinkedIn company profile URL (used in Schema.org sameAs rich snippet).',
    }),
    defineField({
      name: 'robotsTxt',
      title: 'Custom Robots.txt Directives',
      type: 'text',
      rows: 7,
      description:
        'Custom directives for search engine web crawlers (e.g. User-agent: * / Disallow: /admin). Leave empty to use default crawl rules.',
    }),
  ],
  preview: {
    select: {
      title: 'firmName',
      subtitle: 'infoEmail',
    },
  },
});

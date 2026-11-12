import { defineType, defineField } from 'sanity';

export const redirect = defineType({
  name: 'redirect',
  title: 'URL Redirects (301 / 302)',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Source Path',
      type: 'string',
      description: 'The incoming URL path to redirect from (e.g. /old-insights or /attorney/john-doe)',
      placeholder: '/old-path',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true;
          if (!value.startsWith('/')) {
            return 'Source path must start with a leading slash (e.g. /old-page)';
          }
          return true;
        }),
    }),
    defineField({
      name: 'destination',
      title: 'Destination Path or URL',
      type: 'string',
      description: 'The destination internal path (e.g. /practice-areas) or full external URL (e.g. https://example.com)',
      placeholder: '/new-path or https://...',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent Redirect (301)',
      type: 'boolean',
      initialValue: true,
      description:
        'Toggle ON for a 301 Permanent Redirect (transfers SEO link equity). Toggle OFF for a 302 Temporary Redirect.',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'string',
      description: 'Optional note describing why this redirect was added (e.g. "Legacy 2024 URL cleanup")',
    }),
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      permanent: 'permanent',
      notes: 'notes',
    },
    prepare({ source, destination, permanent, notes }) {
      const typeLabel = permanent !== false ? '301 Permanent' : '302 Temporary';
      return {
        title: source || 'Untitled Redirect',
        subtitle: `→ ${destination || 'None'} [${typeLabel}]${notes ? ` · ${notes}` : ''}`,
      };
    },
  },
});

import { defineType, defineField } from 'sanity';

/**
 * A single UI translation entry.
 * One document per key — the key uses dotted notation (e.g. common.header.about)
 * and resolves into the nested message object consumed by next-intl.
 */
export const translation = defineType({
  name: 'translation',
  title: 'Translation',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Dotted key, e.g. common.header.about',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      description:
        'Domain group, used to organise entries in the Studio (header, footer, forms, projects…).',
    }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 2 }),
    defineField({ name: 'fr', title: 'Français', type: 'text', rows: 2 }),
    defineField({ name: 'ar', title: 'العربية', type: 'text', rows: 2 }),
    defineField({ name: 'kr', title: '한국어', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'key', subtitle: 'en' },
  },
  orderings: [
    {
      title: 'Key (A→Z)',
      name: 'keyAsc',
      by: [{ field: 'key', direction: 'asc' }],
    },
    {
      title: 'Group, then key',
      name: 'groupAsc',
      by: [
        { field: 'group', direction: 'asc' },
        { field: 'key', direction: 'asc' },
      ],
    },
  ],
});

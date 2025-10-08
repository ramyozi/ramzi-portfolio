import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
    }),
    defineField({
      name: 'dateRange',
      title: 'Date range',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Main image',
      type: 'image',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        { name: 'repo', type: 'url', title: 'Repository' },
        { name: 'live', type: 'url', title: 'Live URL' },
      ],
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: ['fr', 'en', 'ar', 'kr'],
      },
    }),
  ],
});

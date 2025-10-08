import { defineType, defineField, defineArrayMember } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'status', title: 'Status', type: 'string' }),
    defineField({ name: 'dateRange', title: 'Date range', type: 'string' }),

    defineField({ name: 'image', type: 'url', title: 'Main Image (URL)' }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [{ type: 'url' }],
    }),

    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'technology',
          fields: [
            defineField({
              name: 'key',
              type: 'string',
              title: 'Key (for logo)',
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label (for display)',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'links',
      type: 'object',
      title: 'Links',
      fields: [
        defineField({ name: 'repo', type: 'url', title: 'Main Repository' }),
        defineField({
          name: 'repoFrontend',
          type: 'url',
          title: 'Frontend Repo',
        }),
        defineField({
          name: 'repoBackend',
          type: 'url',
          title: 'Backend Repo',
        }),
        defineField({ name: 'repoMobile', type: 'url', title: 'Mobile Repo' }),
        defineField({ name: 'live', type: 'url', title: 'Live Demo' }),
      ],
    }),

    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: { list: ['fr', 'en', 'ar', 'kr'], layout: 'dropdown' },
      validation: (R) => R.required(),
    }),
  ],
});

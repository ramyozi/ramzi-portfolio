import { defineType, defineField, defineArrayMember } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
            }),
          ],
        }),
        defineField({
          name: 'fr',
          title: 'Français',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Titre' }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
            }),
          ],
        }),
        defineField({
          name: 'ar',
          title: 'العربية',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'العنوان' }),
            defineField({ name: 'description', type: 'text', title: 'الوصف' }),
          ],
        }),
        defineField({
          name: 'kr',
          title: '한국어',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: '제목' }),
            defineField({ name: 'description', type: 'text', title: '설명' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planned', value: 'planned' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'On Hold', value: 'on_hold' },
        ],
        layout: 'radio',
      },
      initialValue: 'planned',
    }),

    defineField({ name: 'dateRange', title: 'Date Range', type: 'string' }),

    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'skill' }] }],
    }),

    defineField({
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        defineField({ name: 'repo', type: 'url', title: 'Repository' }),
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
        defineField({ name: 'live', type: 'url', title: 'Live URL' }),
      ],
    }),
  ],
});

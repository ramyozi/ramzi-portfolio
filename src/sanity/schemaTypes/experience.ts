import { defineType, defineField, defineArrayMember } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experiences',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'period', title: 'Period', type: 'string' }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'skill' }] }],
    }),
    defineField({
      name: 'tasks',
      title: 'Tasks',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
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

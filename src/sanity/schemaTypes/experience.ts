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

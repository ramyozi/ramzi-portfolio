import { defineType, defineField } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experiences',
  type: 'document',
  fields: [
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
      of: [{ type: 'reference', to: [{ type: 'skill' }] }],
    }),
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'object',
      fields: [
        defineField({
          name: 'fr',
          type: 'object',
          title: 'French',
          fields: [
            { name: 'company', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'period', type: 'string' },
            { name: 'solution', type: 'text' },
            { name: 'tasks', type: 'array', of: [{ type: 'string' }] },
          ],
        }),
        defineField({
          name: 'en',
          type: 'object',
          title: 'English',
          fields: [
            { name: 'company', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'period', type: 'string' },
            { name: 'solution', type: 'text' },
            { name: 'tasks', type: 'array', of: [{ type: 'string' }] },
          ],
        }),
        defineField({
          name: 'ar',
          type: 'object',
          title: 'Arabic',
          fields: [
            { name: 'company', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'period', type: 'string' },
            { name: 'solution', type: 'text' },
            { name: 'tasks', type: 'array', of: [{ type: 'string' }] },
          ],
        }),
        defineField({
          name: 'kr',
          type: 'object',
          title: 'Korean',
          fields: [
            { name: 'company', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'period', type: 'string' },
            { name: 'solution', type: 'text' },
            { name: 'tasks', type: 'array', of: [{ type: 'string' }] },
          ],
        }),
      ],
    }),
  ],
});

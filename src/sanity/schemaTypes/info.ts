import { defineType, defineField } from 'sanity';

export const aboutMe = defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
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

export const motivation = defineType({
  name: 'motivation',
  title: 'Motivation',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
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

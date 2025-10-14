import { defineType, defineField } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title displayed prominently, e.g., "Full-Stack Developer"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: { list: ['fr', 'en', 'ar', 'kr'] },
    }),
  ],
});

export const aboutMe = defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'string',
      description:
        'Short introductory sentence displayed above the main content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'cv',
      title: 'CV File',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: { list: ['fr', 'en', 'ar', 'kr'] },
    }),
  ],
});

export const motivation = defineType({
  name: 'motivation',
  title: 'Motivation',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'string',
      description:
        'Short introductory sentence displayed above the main content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: { list: ['fr', 'en', 'ar', 'kr'] },
    }),
  ],
});

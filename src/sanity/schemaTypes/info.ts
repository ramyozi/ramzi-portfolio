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
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: { list: ['fr', 'en', 'ar', 'kr'] },
    }),
  ],
});

export const currentStatus = defineType({
  name: 'currentStatus',
  title: 'Current Status',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Title of the section, e.g., "Right Now" or "En ce moment"',
    }),
    defineField({
      name: 'availability',
      title: 'Availability Badge',
      type: 'string',
      description: 'Short text for the availability badge, e.g., "Open to opportunities"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Main description about current availability',
    }),
    defineField({
      name: 'lookingFor',
      title: 'Looking For',
      type: 'text',
      description: 'What kind of projects/teams you are looking for',
    }),
    defineField({
      name: 'contractTypes',
      title: 'Contract Types',
      type: 'string',
      description: 'Types of contracts, e.g., "Permanent & Fixed-term"',
    }),
    defineField({
      name: 'regions',
      title: 'Regions',
      type: 'string',
      description: 'Target regions, e.g., "Occitanie • PACA"',
    }),
    defineField({
      name: 'regionDetails',
      title: 'Region Details',
      type: 'string',
      description: 'Specific cities, e.g., "Toulouse, Montpellier, Nîmes..."',
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

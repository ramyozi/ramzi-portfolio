import { defineType, defineField } from 'sanity';

export const skill = defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['language', 'framework', 'tool'],
      },
    }),
    defineField({
      name: 'name',
      title: 'Skill name',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon key',
      type: 'string',
    }),
    defineField({
      name: 'level',
      title: 'Proficiency level',
      type: 'string',
      options: {
        list: ['+', '++', '+++'],
      },
    }),
  ],
});

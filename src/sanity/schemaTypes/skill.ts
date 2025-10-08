import { defineType, defineField } from 'sanity';

export const skill = defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon', type: 'string' }),
    defineField({ name: 'level', title: 'Level', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['languages', 'frameworks', 'tools'],
        layout: 'dropdown',
      },
    }),
  ],
});

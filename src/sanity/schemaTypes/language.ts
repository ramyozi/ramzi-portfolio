import { defineType, defineField } from 'sanity';

export const language = defineType({
  name: 'language',
  title: 'Languages',
  type: 'document',
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'string' }),
    defineField({ name: 'level', title: 'Level', type: 'number' }),
  ],
});

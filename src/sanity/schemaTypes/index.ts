import { language } from '@/sanity/schemaTypes/language';
import { project } from '@/sanity/schemaTypes/project';
import { skill } from '@/sanity/schemaTypes/skill';
import { experience } from '@/sanity/schemaTypes/experience';

export const schema = {
  types: [project, skill, language, experience],
};

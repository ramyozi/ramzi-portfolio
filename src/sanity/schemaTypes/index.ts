import { language } from '@/sanity/schemaTypes/language';
import { project } from '@/sanity/schemaTypes/project';
import { skill } from '@/sanity/schemaTypes/skill';
import { experience } from '@/sanity/schemaTypes/experience';
import { aboutMe, hero, motivation } from '@/sanity/schemaTypes/info';

export const schema = {
  types: [hero, aboutMe, motivation, project, skill, language, experience],
};

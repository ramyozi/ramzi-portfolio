import { language } from '@/sanity/schemaTypes/language';
import { project } from '@/sanity/schemaTypes/project';
import { skill } from '@/sanity/schemaTypes/skill';
import { experience } from '@/sanity/schemaTypes/experience';
import { aboutMe, motivation } from '@/sanity/schemaTypes/info';

export const schema = {
  types: [aboutMe, motivation, project, skill, language, experience],
};

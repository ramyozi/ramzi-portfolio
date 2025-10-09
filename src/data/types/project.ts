import { Skill } from './skill';

export interface ProjectLinks {
  repo?: string;
  repoFrontend?: string;
  repoBackend?: string;
  repoMobile?: string;
  live?: string;
}

export interface ProjectTranslation {
  title: string;
  description: string;
}

export type ProjectStatus = 'planned' | 'in_progress' | 'completed' | 'on_hold';

export interface Project {
  _id: string;
  translations: Record<string, ProjectTranslation>;
  status?: ProjectStatus;
  dateRange?: string;
  image?: { url: string };
  gallery?: { url: string }[];
  technologies?: Skill[];
  links?: ProjectLinks;
}

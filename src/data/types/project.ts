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
  context?: string;
  noteLabel?: string;
  noteBody?: string;
}

export type ProjectStatus = 'planned' | 'in_progress' | 'completed' | 'on_hold';

export interface Project {
  _id: string;
  _createdAt?: string;
  translations: Record<string, ProjectTranslation>;
  status?: ProjectStatus;
  dateRange?: string;
  date?: string;
  featured?: number;
  image?: { url: string };
  gallery?: { url: string }[];
  technologies?: Skill[];
  links?: ProjectLinks;
}

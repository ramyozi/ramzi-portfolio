export interface Technology {
  key: string;
  label: string;
}

export interface ProjectLinks {
  repo?: string;
  repoFrontend?: string;
  repoBackend?: string;
  repoMobile?: string;
  live?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  status?: string;
  dateRange?: string;
  image?: string;
  technologies: Technology[];
  links?: ProjectLinks;
  locale?: string;
}

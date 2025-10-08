export interface Project {
  _id: string;
  title: string;
  description: string;
  status?: string;
  dateRange?: string;
  image?: string;
  technologies: string[];
  links?: {
    repo?: string;
    repoFrontend?: string;
    repoBackend?: string;
    repoMobile?: string;
    live?: string;
  };
  locale?: string;
}

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

export type Project = {
  _id: string;
  title: string;
  description: string;
  status?: string;
  dateRange?: string;
  image?: { url: string };
  gallery?: { url: string }[];
  technologies?: Technology[];
  links?: ProjectLinks[];
  locale: string;
};

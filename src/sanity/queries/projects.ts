export const allProjectsQuery = `
*[_type == "project" && (!defined(locale) || locale == $locale)] | order(dateRange desc) {
  _id,
  title,
  description,
  status,
  dateRange,
  image,
  gallery,
  technologies[]{key, label},
  links{repo, repoFrontend, repoBackend, repoMobile, live},
  locale
}
`;

export const projectByIdQuery = `
*[_type == "project" && _id == $id][0]{
  _id,
  title,
  description,
  status,
  dateRange,
  image,
  gallery,
  technologies[]{key, label},
  links{repo, repoFrontend, repoBackend, repoMobile, live},
  locale
}
`;

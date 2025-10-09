export const allProjectsQuery = `
*[_type == "project"]{
  _id,
  translations,
  status,
  dateRange,
  image { "url": asset->url },
  gallery[] { "url": asset->url },
  technologies[]->{
    _id,
    name,
    icon,
    level,
    category
  },
  links
}
`;

export const projectByIdQuery = `
*[_type == "project" && _id == $id][0]{
  _id,
  translations,
  status,
  dateRange,
  image { "url": asset->url },
  gallery[] { "url": asset->url },
  technologies[]->{
    _id,
    name,
    icon,
    level,
    category
  },
  links
}
`;

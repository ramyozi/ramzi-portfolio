export const allProjectsQuery = `
*[_type == "project"]{
  _id,
  translations,
  order,
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
} | order(coalesce(order, 9999) asc, _id asc)
`;

export const projectByIdQuery = `
*[_type == "project" && _id == $id][0]{
  _id,
  translations,
  order,
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

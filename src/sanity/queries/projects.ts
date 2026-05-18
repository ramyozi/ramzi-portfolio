const projectProjection = `
  _id,
  _createdAt,
  translations,
  status,
  dateRange,
  date,
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
`;

export const allProjectsQuery = `
*[_type == "project"]{${projectProjection}} | order(coalesce(date, _createdAt) desc)
`;

export const projectByIdQuery = `
*[_type == "project" && _id == $id][0]{${projectProjection}}
`;

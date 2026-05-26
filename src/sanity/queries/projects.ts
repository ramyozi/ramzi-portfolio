const projectProjection = `
  _id,
  _createdAt,
  translations,
  status,
  dateRange,
  date,
  featured,
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

// Featured projects pinned first (ascending rank, nulls last),
// then everything else newest-first by project date.
export const allProjectsQuery = `
*[_type == "project"]{${projectProjection}} | order(coalesce(featured, 9999) asc, coalesce(date, _createdAt) desc)
`;

export const projectByIdQuery = `
*[_type == "project" && _id == $id][0]{${projectProjection}}
`;

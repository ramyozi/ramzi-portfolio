export const allProjectsQuery = `
  *[_type == "project" && locale == $locale]{
    _id,
    title,
    description,
    status,
    dateRange,
    "image": image.asset->url,
    technologies,
    links
  }
`;

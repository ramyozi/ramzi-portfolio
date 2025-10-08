export const allProjectsQuery = `
*[_type == "project" && (!defined(locale) || locale == $locale)] | order(dateRange desc) {
  _id,
  title,
  description,
  status,
  dateRange,
  "image": image.asset->url,
  technologies[] {
    key,
    label
  },
  links {
    repo,
    repoFrontend,
    repoBackend,
    repoMobile,
    live
  },
  locale
}
`;

export const aboutMeQuery = `
  *[_type == "aboutMe" && locale == $locale][0]{
    _id, content, locale
  }
`;

export const motivationQuery = `
  *[_type == "motivation" && locale == $locale][0]{
    _id, content, locale
  }
`;

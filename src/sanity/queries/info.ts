export const aboutMeQuery = `
  *[_type == "aboutMe" && locale == $locale][0]{
    _id,
    content,
    "cv": cv.asset->{url},
    "image": image.asset->{url},
    locale
  }
`;

export const motivationQuery = `
  *[_type == "motivation" && locale == $locale][0]{
    content,
    locale,
    "image": image.asset->{
      url
    }
  }
`;

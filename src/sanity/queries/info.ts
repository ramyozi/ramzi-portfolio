export const heroQuery = `
    *[_type == "hero" && locale == $locale][0]{
        _id,
        "profileImage": profileImage.asset->{url},
        title,
        subtitle,
        locale
    }
`;

export const aboutMeQuery = `
  *[_type == "aboutMe" && locale == $locale][0]{
    _id,
    intro,
    content,
    "cv": cv.asset->{url},
    locale
  }
`;

export const motivationQuery = `
  *[_type == "motivation" && locale == $locale][0]{
    intro,
    content,
    locale,
    "image": image.asset->{url}
  }
`;

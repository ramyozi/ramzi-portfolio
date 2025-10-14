export interface Hero {
  _id: string;
  profileImage?: {
    url: string;
  };
  title: string;
  subtitle: string;
}

export interface AboutMe {
  _id: string;
  intro: string;
  content: string;
  locale: string;
  cv?: {
    url: string;
  };
}

export interface Motivation {
  _id: string;
  intro: string;
  content: string;
  locale: string;
  image?: {
    url: string;
  };
}

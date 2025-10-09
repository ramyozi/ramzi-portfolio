export interface AboutMe {
  _id: string;
  content: string;
  locale: string;
  cv?: {
    url: string;
  };
}

export interface Motivation {
  _id: string;
  content: string;
  locale: string;
  image?: {
    url: string;
  };
}

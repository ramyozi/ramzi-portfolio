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
}

export interface CurrentStatus {
  _id: string;
  title: string;
  availability: string;
  description: string;
  lookingFor: string;
  contractTypes: string;
  regions: string;
  regionDetails: string;
  locale: string;
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

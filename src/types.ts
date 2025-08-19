// Article references posts, geopolitical watches and cultures.
export interface Article {
  contentType: {
    node: {
      name: string;
    };
  };
  id: string;
  title: string;
  content: string;
  date: string;
  tags: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  typeDeVeilles?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author: {
    node: {
      avatar: {
        url: string;
      };
      firstName: string;
      lastName: string;
      description: string;
    };
  };
  wordCount: number;
  readingTime: number;
  contenuPublic: {
    isPublic: string;
  };
}

// Formation references training courses.
export interface Formation {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  typesDeFormations: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  niveauxDeFormation: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  rythmesDeFormation: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  singleFormations: {
    banner: {
      node: {
        sourceUrl: string;
        altText: string;
        srcSet: string;
      };
    };
    apercuFormation: {
      texteIntroFormation: string;
      publicsCibles: {
        textePublicsCibles: string;
      };
      modalite: {
        dureeFormation: string;
        nombreParticipants: string;
        langue: string;
        rythme: string;
        format: string;
      };
      prerequis: {
        textePrerequis: string;
      };
      benefices: {
        texteBenefices: string;
      };
    };
    objectifsPedagogiques: {
      texteIntroObjectifs: string;
      objectifs: {
        titreObjectif: string;
        descriptionObjectif: string;
      }[];
    };
    programmeFormation: {
      texteIntroProgramme: string;
      seances: {
        titreSeance: string;
        descriptionSeance: string;
      }[];
      programmePdf: {
        node: {
          link: string;
        };
      };
    };
    evaluations: {
      evaluationsBoxes: {
        evaluationTitle: string;
        evaluationDescription: string;
      }[];
    };
    modalites: {
      boiteModalites: {
        titreBoite: string;
        descriptionModalite: string;
      }[];
      tarifs: {
        particulierProgressif: string;
        particulierIntensif: string;
        entrepriseProgressif: string;
        entrepriseIntensif: string;
        payPerSession: boolean;
      };
    };
    recapitulatif: {
      dates: {
        startingDate: string;
        endingDate: string;
      }[];
    };
    testimonials: {
      fullName: string;
      note: string[];
      review: string;
    };
    formateur: {
      nodes: {
        lastName: string;
        firstName: string;
        avatar: {
          url: string;
        };
      }[];
    };
  };
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  role: string;
  customerId?: string;
  subscriptionId?: string;
}

export interface Filters {
  category?: {
    taxonomy: string;
    field: string;
    terms: string[];
  };
  tag?: {
    taxonomy: string;
    field: string;
    terms: string[];
  };
  niveau?: {
    taxonomy: string;
    field: string;
    terms: string[];
  };
  rythme?: {
    taxonomy: string;
    field: string;
    terms: string[];
  };
  typeDeCultures?: {
    taxonomy: string;
    field: string;
    terms: string[];
  };
}

export interface Error {
  success: boolean;
  status: number;
  message: string;
  data: null;
}

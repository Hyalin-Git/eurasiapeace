export interface ElementProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  author: {
    node: {
      name: string;
    };
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  tags: {
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
  typesExperts?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  typesDeFormations?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  rythmesDeFormation?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  niveauxDeFormation?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  singleFormations: {
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
    evaluation: {
      evaluationRapport: string;
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
      };
    };
    recapitulatif: {
      dates: {
        dateFormation: string;
      }[];
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
  acfFields: {
    nombreDePagePdf: number;
  };
  contentType: {
    node: {
      id: string;
      name: string;
    };
  };
}

export interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  button?: {
    label: string;
  };
  href?: string;
  className: {
    background: string;
    button: string;
    backgroundHover: string;
    iconBackground: string;
  };
}

export interface ServicesProps {
  servicesData: Service[];
  classNameToChild?: string;
  className?: string;
}

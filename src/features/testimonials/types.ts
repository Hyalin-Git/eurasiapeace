export interface Testimonials {
  id: string;
  testimonials: {
    stars: number;
    avis: string;
    fullName: string;
    profilPicture: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
  };
}

export interface Member {
  committeeMember: string;
  picture: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  fullName: string;
  title: string;
  expertises: {
    expertise: string;
  }[];
  bio: string;
}

export interface Members {
  committeesMembersFields: Member[];
}

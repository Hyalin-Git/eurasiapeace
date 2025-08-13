export interface Member {
  committeeMember: string;
  fullName: string;
  title: string;
  expertises: {
    expertise: string;
  }[];
  bio: string;
}

export interface Members {
  acfFields: Member[];
}

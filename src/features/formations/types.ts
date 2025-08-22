export interface InitialState {
  success: boolean;
  status: number | null;
  message: string;
  formData: FormData | null;
  errors: Record<string, string[]> | null;
}

export interface Reviews {
  fullName: string;
  note: string[];
  review: string;
}

export interface Evaluations {
  evaluationTitle: string;
  evaluationDescription: string;
}

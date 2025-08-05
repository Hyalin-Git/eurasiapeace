export interface InitialState {
  success: boolean;
  status: number | null;
  message: string;
  formData: FormData | null;
  errors: ZodErrors | null;
}

interface ZodErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  confirmTerms?: string[];
}

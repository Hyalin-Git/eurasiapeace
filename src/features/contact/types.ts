export interface ZodError {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  phone?: string[];
  subject?: string[];
  message?: string[];
  rgpd?: string[];
}

export interface InitialState {
  success: boolean;
  status: number | null;
  message: string;
  formData: FormData | null;
  errors: ZodError | null;
}

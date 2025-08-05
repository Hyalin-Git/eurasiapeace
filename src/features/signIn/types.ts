export interface InitialState {
  success: boolean;
  status: number | null;
  message: string;
  formData: FormData | null;
  errors: ZodErrors | null;
}

interface ZodErrors {
  email?: string[];
  password?: string[];
}

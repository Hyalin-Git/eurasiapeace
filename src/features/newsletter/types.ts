export interface ZodError {
  email?: string[];
}

export interface InitialState {
  success: boolean;
  status: number | null;
  message: string;
  errors: ZodError | null;
}

export interface InitialState {
  success: boolean;
  status: number | null;
  message: string;
  formData: FormData | null;
  errors: Record<string, string[]> | null;
}

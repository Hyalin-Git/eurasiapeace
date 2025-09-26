export interface User {
  databaseId: string;
  firstName: string;
  lastName: string;
  email: string;
  customAvatar: string | null;
  description: string | null;
  registeredDate: string;
}

export interface InitialState {
  success: boolean;
  status: number | null;
  message: string | null;
  formData: FormData | null;
  errors: Record<string, string[]> | null;
}

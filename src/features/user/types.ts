export interface User {
  databaseId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: {
    url: string;
  };
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

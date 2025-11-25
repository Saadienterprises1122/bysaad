export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  goal: string;
  message: string;
}

export interface ContactErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  service?: string;
  goal?: string;
  message?: string;
}

export interface ContactProps {}

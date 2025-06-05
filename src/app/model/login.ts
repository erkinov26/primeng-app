export class Login {
  email: string = '';
  password: string = '';
  constructor() {
    this.email = '';
    this.password = '';
  }
}

export interface LoginInterface {
  email: string;
  password: string;
}
export interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  options?: { value: any; label: string }[];
  icon?: string; // Optional icon for input
}
export const formFields: FormField[] = [
  { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', icon: 'bx bx-user' },
  { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password', icon: 'bx bx-lock' }
];
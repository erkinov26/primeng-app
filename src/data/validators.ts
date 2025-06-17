import { Validators } from "@angular/forms";

export const teacherFormFields = {
  username: ['', [Validators.required, Validators.minLength(6)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  first_name: ['', [Validators.required]],
  last_name: ['', [Validators.required]],
};

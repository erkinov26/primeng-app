import { Validators } from "@angular/forms";

export const teacherFormFields = {
  username: ['', [Validators.required, Validators.minLength(6)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  first_name: ['', [Validators.required]],
  last_name: ['', [Validators.required]],
};

export const classFormFields = {
  name: ['', [Validators.required]],
  curator_id: ['', Validators.required],
}
export const pupilFormFields = {
  username: ['', [Validators.required, Validators.minLength(6)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  first_name: ['', [Validators.required]],
  last_name: ['', [Validators.required]],
}
export const group_detail_validator = {
  pupil_id: ['', [Validators.required]],
}
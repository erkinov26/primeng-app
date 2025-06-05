import { Component, OnInit } from '@angular/core';
import { FormComponent } from "../../shared/form/form.component";
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [FormComponent, CardModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup
  registerFields = [
    { label: 'Username', name: 'username', type: 'text', placeholder: 'Enter your username', icon: 'bx bx-user' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', icon: 'bx bx-envelope' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password', icon: 'bx bx-lock' },
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', []],
      email: ['', []],
      password: ['', []],
    });
  }
  
  handleRegister(): void {
    if (this.registerForm.valid) {
      console.log('Registration Form Submitted:', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}

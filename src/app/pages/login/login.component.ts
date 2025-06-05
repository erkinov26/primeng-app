
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from "../../shared/form/form.component";

import { CardModule } from 'primeng/card';
import { FormField } from '../../model/login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    CardModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  router = inject(Router);
  http = inject(HttpClient)
  fetchError: string | null = null;
  loginFields: FormField[] = [ // Explicitly type with FormField
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', icon: 'bx bx-user' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password', icon: 'bx bx-lock' }
  ];
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  handleLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login Form Submitted:', this.loginForm.value);
      this.isLoading = true;
      this.http.post('http://localhost:4000/user/login', this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Login successful:', response);
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error.error, "erooooooooooooooooooooooooooooor");

          // console.log(error.error.errors[0].msg, "erooooooooooooooooooooooooooooor");
          
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
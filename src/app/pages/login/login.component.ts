
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from "../../shared/form/form.component";

import { CardModule } from 'primeng/card';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    CardModule,
    RouterLink
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
  loginFields: any[] = [ // Explicitly type with FormField
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', icon: 'bx bx-user' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password', icon: 'bx bx-lock' }
  ];
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  clearFetchError(): void {
    this.fetchError = null;
  }


  handleLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login Form Submitted:', this.loginForm.value);
      this.isLoading = true;
      this.http.post('http://localhost:4000/auth/login', this.loginForm.value).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          localStorage.setItem('token', response.token);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 100); // 100ms delay, optional
        },
        error: (error) => {
          this.isLoading = false;
          this.fetchError = error.error.message
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from "../../shared/form/form.component";
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  imports: [FormComponent, CardModule, RouterLink],
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
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  http = inject(HttpClient)
  router = inject(Router)
  isLoading: boolean = false
  fetchError: string | null = null
  clearFetchError(): void {
    this.fetchError = null;
  }
  handleRegister(): void {
    if (this.registerForm.valid) {
      this.isLoading = true
      this.http.post('http://localhost:4000/user/signup', this.registerForm.value).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          localStorage.setItem('token', response.token)
          this.router.navigate([''])
        },
        error: (err) => {
          this.isLoading = false;
          this.fetchError = err.error.message
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}

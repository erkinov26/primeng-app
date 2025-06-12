import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [TableComponent, ButtonModule, DialogComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
  teachersAddForm!: FormGroup;
  isGettingLoaded: boolean = false
  teachersData: any[] = [];
  teacherAddVisible: boolean = false;
  title: string = "Add teacher";

  constructor(private fb: FormBuilder) { }

  inputFields = [
    { label: 'Username', name: 'username', type: 'text', placeholder: 'Enter your username', icon: 'bx bx-user' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', icon: 'bx bx-envelope' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password', icon: 'bx bx-lock' },
  ];

  columnData: any[] = [
    { title: 'Username', key: 'username' },
    { title: 'Email', key: 'email' }
  ];

  http = inject(HttpClient);

  ngOnInit(): void {
    this.teachersAddForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.getAllTeachers();
  }

  showTeacherDialog() {
    this.teacherAddVisible = true;
  }

  getAllTeachers() {
    this.isGettingLoaded = true
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get("http://localhost:4000/users/curators", { headers }).subscribe({
      next: (res: any) => {
        console.log(res);
        this.teachersData = res;
        this.isGettingLoaded = false
      },
      error: (err) => {
        console.error("❌ Error fetching teachers:", err);
        this.isGettingLoaded = false
      }
    });
  }

  handleAddTeacher(): void {
    if (this.teachersAddForm.valid) {
      const teacherData = {
        ...this.teachersAddForm.value,
        role: 'teacher'
      };

      this.http.post('http://localhost:4000/auth/signup', teacherData).subscribe({
        next: (response: any) => {
          console.log("✅ Teacher created:", response);
          // Token saqlash (agar mavjud bo‘lsa)
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          this.teacherAddVisible = false;
          this.getAllTeachers(); // ro‘yxatni yangilash
        },
        error: (err) => {
          console.error("❌ Error during signup:", err);
        }
      });
    } else {
      this.teachersAddForm.markAllAsTouched();
    }
  }
}

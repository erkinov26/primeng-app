import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [TableComponent, ButtonModule, DialogComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
  teachersAddForm!: FormGroup
  teachersData: any[] = [];
  teacherAddVisible: boolean = false;
  title: string = "Add teacher";
  constructor(private fb: FormBuilder) {

  }
  // username, email, password, role
  ngOnInit(): void {
    this.teachersAddForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  inputFields = [
    { label: 'Username', name: 'username', type: 'text', placeholder: 'Enter your username', icon: 'bx bx-user' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', icon: 'bx bx-envelope' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password', icon: 'bx bx-lock' },
  ]

  columnData: any[] = [
    { title: 'Teacher Name', key: 'name' },
    { title: 'Tutor Id', key: 'curator_id' }
  ];

  showTeacherDialog() {
    this.teacherAddVisible = true;
  }
  handleAddTeacher(): void {
    if (this.teachersAddForm.valid) {
      console.log(this.teachersAddForm.value);
    } else {
      this.teachersAddForm.markAllAsTouched()
    }
  }
}

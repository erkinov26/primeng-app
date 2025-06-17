import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from "../../shared/table/table.component";
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pupils',
  imports: [ButtonModule, TableComponent, DialogComponent],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent implements OnInit {
  pupilAddForm!: FormGroup
  title: string = "Add pupil"
  pupilData: any[] = []
  isPupilCreateVisible: boolean = false
  inputFields: any[] = [
    { label: 'Username', name: 'username', type: 'text', placeholder: 'Enter your username', icon: 'bx bx-user' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', icon: 'bx bx-envelope' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password', icon: 'bx bx-lock' },
    { label: 'First Name', name: 'first_name', type: 'text', placeholder: 'Enter your first name', icon: 'bx bx-envelope' },
    { label: 'Last Name', name: 'last_name', type: 'text', placeholder: 'Enter your last name', icon: 'bx bx-lock' },
  ];
  token = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.token}` };
  showPupilDialog() {
    this.isPupilCreateVisible = true
  }
  constructor(private http: HttpClient, private fb: FormBuilder) {
  }
  columnData: any = [
    {
      title: "Username",
      key: 'username'
    },
    {
      title: "Email", key: 'email'
    },
    { title: "First Name", key: 'first_name' },
    {
      title: "Class Name",
      key: 'class_name',
      valueGetter: (row: any) => row.class_name ?? 'No class'


    }
  ]

  ngOnInit(): void {
    this.getPupilData()
    this.pupilAddForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    })
  }
  handleCreatePupil() {
    this.http.post('http://localhost:5000/pupil', this.pupilAddForm.value, { headers: this.headers }).subscribe({
      next: (res) => {
        console.log(res, 'pupil created');
        this.isPupilCreateVisible = false
        this.getPupilData()
      },
      error: (err) => {
        console.log(err, 'error occurs');
      }
    })
  }
  getPupilData() {
    this.http.get('http://localhost:5000/pupil').subscribe({
      next: (res: any) => {
        console.log("🚀 ~ PupilsComponent ~ this.http.get ~ res:", res)
        this.pupilData = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, TableComponent, ButtonModule, DialogComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent implements OnInit {
  classAddForm!: FormGroup;
  classData: any[] = [];
  classAddVisible: boolean = false;
  title: string = "Add Class";
  columnData: any[] = [
    { title: 'Class name', key: 'name' },
    { title: 'Tutor Id', key: 'curator_id' }
  ];
  inputFields: Array<{
    label: string;
    name: string;
    type: string;
    placeholder: string;
    icon: string;
    options?: Array<{ label: string; value: any }>;
    noOptionsMessage?: string;
    addRoute?: string;
  }> = [
      { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your class name', icon: 'bx bx-user' },
      {
        label: 'Teacher',
        name: 'curator',
        type: 'select',
        placeholder: 'Select your curator',
        icon: 'bx bx-user',
        options: [],
        noOptionsMessage: 'No curators available. Add curators first.',
        addRoute: '/teachers'
      }
    ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.classAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      curator: ['', Validators.required],
    });
    this.fetchCurators();
  }

  fetchCurators() {
    this.http.get<any[]>('/api/curators').subscribe({
      next: data => {
        const sel = this.inputFields.find(f => f.name === 'curator')!;
        sel.options = data.map(c => ({ label: c.name, value: c.id }));
      },
      error: err => console.error(err)
    });
  }

  showClassDialog() {
    this.classAddVisible = true;
  }

  handleAddClass(): void {
    if (this.classAddForm.valid) {
      console.log(this.classAddForm.value);
      this.classAddVisible = false;
    } else {
      this.classAddForm.markAllAsTouched();
    }
  }
}

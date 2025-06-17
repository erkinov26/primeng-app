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
  columnData: any[] = [];

  curatorMap: Record<string, string> = {}; // { id: username }

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
        name: 'curator_id',
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

  goToPage(data: any) {
    this.router.navigate(['/group-details', data.class_id]);
  }

  ngOnInit(): void {
    this.classAddForm = this.fb.group({
      name: ['', [Validators.required]],
      curator_id: ['', Validators.required],
    });

    this.fetchCuratorsAndInitializeColumns();
    this.handleGetAllClasses();
  }

  fetchCuratorsAndInitializeColumns() {
    this.http.get<any[]>('http://localhost:5000/teacher', { headers: this.headers }).subscribe({
      next: (res) => {
        console.log("🚀 ~ ClassesComponent ~ fetchCuratorsAndInitializeColumns ~ res:", res)
        // Form select uchun curator options
        const sel = this.inputFields.find(f => f.name === 'curator_id')!;
        console.log("🚀 ~ ClassesComponent ~ fetchCuratorsAndInitializeColumns ~ sel:", sel)
        sel.options = res.map(c => ({ label: c.username, value: c.id }));

        // Curatorlarni ID bo‘yicha map qilish (agar kerak bo‘lsa)
        this.curatorMap = res.reduce((acc, c) => {
          acc[c._id] = `${c.first_name} ${c.last_name}`;
          return acc;
        }, {} as Record<string, string>);

        // 🧩 Table ustunlari classData strukturasiga mos ravishda
        this.columnData = [
          {
            title: 'Class name',
            key: 'class_name' // bu bevosita classData dan keladi
          },
          {
            title: 'Curator',
            valueGetter: (row: any) => {
              // row.teacher bo'lishi kerak
              const teacher = row.teacher;
              if (!teacher) return 'Unknown';
              return `${teacher.first_name} ${teacher.last_name}`;
            }
          },
          {
            title: 'Number of pupils',
            valueGetter: (row: any) => row.pupils?.length ?? 0
          }
        ];
        console.log(this.columnData);

      },
      error: err => console.error(err)
    });
  }


  showClassDialog() {
    this.classAddVisible = true;
  }
  token = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.token}` };


  handleGetAllClasses() {
    console.log("🚀 ~ ClassesComponent ~ headers:", this.headers)
    this.http.get("http://localhost:5000/class", { headers: this.headers }).subscribe({
      next: (res: any) => {
        console.log("🚀 ~ ClassesComponent ~ this.http.get ~ res:", res)
        this.classData = res;
      },
      error: (err) => {
        console.log("🚀 ~ ClassesComponent ~ this.http.get ~ res:", err)
      }
    });
  }

  handleAddClass(): void {
    if (this.classAddForm.valid) {
      this.http.post('http://localhost:5000/class/create', this.classAddForm.value, { headers: this.headers }).subscribe({
        next: (res: any) => {
          console.log(res, 'class created');
          this.handleGetAllClasses();
        }
      });
      this.classAddVisible = false;
    } else {
      this.classAddForm.markAllAsTouched();
    }
  }
}

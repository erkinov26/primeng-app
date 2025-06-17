import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeacherService } from '../../services/teacher/teacher.service';
import { teacherInputFields } from '../../../data/input-fields';
import { teacherColumnData } from '../../../data/column-data';
import { teacherFormFields } from '../../../data/validators';

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
  inputFields: any = teacherInputFields
  columnData: any = teacherColumnData
  constructor(private fb: FormBuilder, private teacherService: TeacherService) { }
  ngOnInit(): void {
    this.teachersAddForm = this.fb.group(teacherFormFields);
    this.getAllTeachers();
  }
  showTeacherDialog() {
    this.teacherAddVisible = true;
  }
  getAllTeachers() {
    this.isGettingLoaded = true
    this.teacherService.getAllTeachers().subscribe({
      next: (res: any) => {
        this.teachersData = res
        this.isGettingLoaded = false
      },
      error: (err) => {
        this.isGettingLoaded = false
        console.log(err);

      }
    })
  }

  handleAddTeacher(): void {
    if (this.teachersAddForm.valid) {
      const teacherData = {
        ...this.teachersAddForm.value,
        role: 'teacher'
      };
      this.teacherService.createTeacher(teacherData).subscribe({
        next: (res) => {
          this.teacherAddVisible = false;
          this.getAllTeachers()
        }
      })
    } else {
      this.teachersAddForm.markAllAsTouched();
    }
  }
}

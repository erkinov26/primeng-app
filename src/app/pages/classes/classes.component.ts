import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { classFormFields } from '../../../data/validators';
import { classInpuFields } from '../../../data/input-fields';
import { ClassService } from '../../services/class/class.service';

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
  curatorMap: Record<string, string> = {};
  inputFields: any = classInpuFields

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private classService: ClassService
  ) { }

  goToPage(data: any) {
    this.router.navigate(['/group-details', data.class_id]);
  }

  ngOnInit(): void {
    this.classAddForm = this.fb.group(classFormFields);
    this.fetchCuratorsAndInitializeColumns();
    this.handleGetAllClasses();
  }
  fetchCuratorsAndInitializeColumns() {
    this.classService.getCuratorOptionsAndMap(this.inputFields).subscribe({
      next: ({ curatorMap, columnData }) => {
        this.curatorMap = curatorMap;
        this.columnData = columnData;
      },
    });

  }
  showClassDialog() {
    this.classAddVisible = true;
  }

  handleGetAllClasses() {
    this.classService.getAllClasses().subscribe({
      next: (res: any) => {
        this.classData = res;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  handleAddClass(): void {
    if (this.classAddForm.valid) {
      this.classService.createClass(this.classAddForm.value).subscribe({
        next: (res) => {
          this.handleGetAllClasses()
          this.classAddVisible = false;
        },
        error: err => {
          console.log(err);

        }
      })
    } else {
      this.classAddForm.markAllAsTouched();
    }
  }
}

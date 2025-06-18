import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from "../../shared/table/table.component";
import { groupDetails } from '../../../data/column-data';
import { ClassService } from '../../services/class/class.service';
import { group_detail_fields } from '../../../data/input-fields';
import { group_detail_validator } from '../../../data/validators';
import { GroupDetailsService } from '../../services/group-details/group-details.service';
import { PupilService } from '../../services/pupil/pupil.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css'],
  standalone: true,
  imports: [ButtonModule, CommonModule, DialogComponent, TableComponent]
})
export class GroupDetailsComponent implements OnInit {
  pupilAddVisible: boolean = false;
  isDeleteLoading: boolean = false;
  isDeleteError: boolean = false;
  pupils: any = [];
  title: string = "Add Pupil";
  pupilAddForm!: FormGroup;
  groupId: string | null = null;
  classData: any = null;
  teacherData: any = null;
  token = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.token}` };
  columnData: any = groupDetails;
  inputFields: any = group_detail_fields;

  // ✅ DELETE FUNCTIONNI BOG‘LASH (kontekst saqlanadi)
  deleteFunction = (id: any) => this.deletePupil(id);

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private classService: ClassService,
    private groupDetailService: GroupDetailsService,
    private pupilService: PupilService
  ) {}

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
    if (this.groupId) {
      this.getClassData();
    }
    this.handleGetAllPupil();
    this.pupilAddForm = this.fb.group(group_detail_validator);
  }

  showPupilDialog() {
    this.pupilAddVisible = true;
  }

  deletePupil(id: any) {
    console.log("🚀 ~ deletePupil ~ id:", id);
    this.isDeleteLoading = true;

    this.pupilService.deletePupil(id).subscribe({
      next: (res) => {
        console.log("Pupil deleted:", res);
        this.isDeleteLoading = false;
        this.getClassData(); // ✅ Yangilanish uchun
      },
      error: (err) => {
        console.log("Delete error:", err);
        this.isDeleteLoading = false;
        this.isDeleteError = true;
      }
    });
  }

  getClassData() {
    this.classService.getOneClassData(this.groupId).subscribe({
      next: (res: any) => {
        this.classData = res;
        this.teacherData = res.teacher;
      },
      error: (err) => {
        console.log("Class data error:", err);
      }
    });
  }

  handleGetAllPupil() {
    this.groupDetailService.getUnassignedPupilOptions().subscribe({
      next: ({ unassignedPupils, options }) => {
        this.pupils = unassignedPupils;
        this.inputFields = [
          {
            label: 'Select Pupil',
            name: 'pupil_id',
            type: 'select',
            placeholder: 'Select pupil',
            options: options,
            route: '/pupils',
            routeText: 'Create Pupil'
          }
        ];
      },
      error: err => console.log("Get all pupil error:", err)
    });
  }

  handleAddPupil() {
    if (this.pupilAddForm.valid && this.groupId) {
      const pupil_id = this.pupilAddForm.value.pupil_id;
      const pupil = {
        class_id: this.groupId,
        pupil_id: pupil_id
      };

      this.groupDetailService.addPupilToClass(pupil).subscribe({
        next: (res: any) => {
          this.getClassData();
          this.pupilAddVisible = false;
          this.pupilAddForm.reset();
        },
        error: (err) => {
          console.log("Add pupil error:", err);
        }
      });
    } else {
      this.pupilAddForm.markAllAsTouched();
    }
  }
}

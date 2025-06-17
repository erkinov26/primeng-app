import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeButtonComponent } from "../../components/prime-button/prime-button.component";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from "../../shared/table/table.component";

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css'],
  imports: [ButtonModule, CommonModule, DialogComponent, TableComponent]
})
export class GroupDetailsComponent implements OnInit {
  pupilAddVisible: boolean = false
  pupils: any = [];
  title: string = "Add Pupil"
  pupilAddForm!: FormGroup
  groupId: string | null = null;
  classData: any = null;
  teacherData: any = null
  token = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.token}` };
  columnData: any = [{
    title: "Username",
    key: 'username'
  }, {
    title: "First Name",
    key: 'first_name'
  }, {
    title: "Email",
    key: 'email'
  }]

  inputFields: any = [
    { label: 'Select Pupil', name: 'pupil_id', type: 'select', placeholder: 'Select pupil', icon: 'bx bx-envelope' },
  ]
  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
    if (this.groupId) {
      this.getClassData();
    }
    this.handleGetAllPupil()
    this.pupilAddForm = this.fb.group({
      pupil_id: ['', [Validators.required]],
    });
  }

  showPupilDialog() {
    this.pupilAddVisible = true
  }
  getClassData() {
    this.http.get(`http://localhost:5000/class/${this.groupId}`, { headers: this.headers }).subscribe({
      next: (res: any) => {
        this.classData = res;
        this.teacherData = res.teacher
        console.log(res, 'classData');
      },
      error: (err) => {
        console.log(err, "error occurs");
      }
    });
  }

  handleGetAllPupil() {
    this.http.get('http://localhost:5000/pupil', { headers: this.headers }).subscribe({
      next: (res: any) => {
        console.log("🚀 ~ GroupDetailsComponent ~ this.http.get ~ res:", res)
        this.pupils = res.filter((pupil: any) => pupil.class_id === null);

        const options = this.pupils.map((pupil: any) => ({
          label: `${pupil.first_name} ${pupil.last_name}`,
          value: pupil.id
        }));
        this.inputFields = [
          {
            label: 'Select Pupil',
            name: 'pupil_id',
            type: 'select',
            placeholder: 'Select pupil',
            options: options
          }
        ];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  handleAddPupil() {
    if (this.pupilAddForm.valid && this.groupId) {
      const pupil_id = this.pupilAddForm.value.pupil_id;
      console.log("🚀 ~ GroupDetailsComponent ~ handleAddPupil ~ pupil_id:", pupil_id)

      const postData = {
        class_id: this.groupId,
        pupil_id: pupil_id
      };

      this.http.post(`http://localhost:5000/class/add-pupil`, postData, { headers: this.headers }).subscribe({
        next: (res: any) => {
          console.log(res, 'added pupil');
          this.getClassData();
          this.pupilAddVisible = false;
          this.pupilAddForm.reset();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.pupilAddForm.markAllAsTouched();
    }
  }

}

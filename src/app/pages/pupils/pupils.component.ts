import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from "../../shared/table/table.component";
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pupilInputFields } from '../../../data/input-fields';
import { pupilsColumndata } from '../../../data/column-data';
import { pupilFormFields } from '../../../data/validators';
import { PupilService } from '../../services/pupil/pupil.service';

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
  inputFields: any[] = pupilInputFields
  showPupilDialog() {
    this.isPupilCreateVisible = true
  }
  constructor(private fb: FormBuilder, private pupilService: PupilService) {
  }
  columnData: any = pupilsColumndata
  ngOnInit(): void {
    this.getPupilData()
    this.pupilAddForm = this.fb.group(pupilFormFields)
  }
  handleCreatePupil() {
    this.pupilService.createPupil(this.pupilAddForm.value).subscribe({
      next: (res: any) => {
        this.isPupilCreateVisible = false
        this.getPupilData()
      },
      error: (err) => {
        console.log(err, 'error occurs');
      }
    })
  }
  getPupilData() {
    this.pupilService.getAllPupils().subscribe({
      next: (res: any) => {
        this.pupilData = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

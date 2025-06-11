import { Component } from '@angular/core';
import { TableComponent } from "../../shared/table/table.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-teachers',
  imports: [TableComponent, ButtonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {
  teachersData: any = []
  columnData: any[] = [
    { title: 'Teacher Name', key: 'name', }, {
      title: 'Tutor Id', key: 'curator_id'
    }
  ]
}

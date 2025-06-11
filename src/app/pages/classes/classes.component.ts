import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, TableComponent, ButtonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

  classData: any = []
  columnData: any[] = [
    { title: 'Class Name', key: 'name', }, {
      title: 'Tutor Id', key:'curator_id'
    }
  ]


}

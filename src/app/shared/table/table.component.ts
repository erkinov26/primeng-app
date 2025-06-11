import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() text: string = '';
  @Input() columnData: { title: string; key: string }[] = [];
  columns: string[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.length > 0) {
      this.columns = Object.keys(this.data[0]);
    } else {
      this.columns = [];
    }
  }
}

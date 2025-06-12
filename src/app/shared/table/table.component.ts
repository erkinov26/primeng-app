import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule,ButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() text: string = '';
  @Input() columnData: { title: string; key: string }[] = [];
  @Input() isLoading!: boolean
  columns: string[] = [];

  onEdit(row: any) {
    console.log('Edit:', row);
    // Edit logikasini shu yerga yozing
  }

  onDelete(row: any) {
    console.log('Delete:', row);
    // O'chirish logikasini shu yerga yozing
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.length > 0) {
      this.columns = Object.keys(this.data[0]);
    } else {
      this.columns = [];
    }
  }
}

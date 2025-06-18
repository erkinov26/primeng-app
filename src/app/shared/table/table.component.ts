import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ConfirmDialogComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() text: string = '';
  @Input() columnData: any = [];
  @Input() isLoading!: boolean
  @Input() onEditHandler: any
  @Input() deleteFunction: any
  columns: string[] = [];
  @Output() edit = new EventEmitter<any>();
  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    debugger
    console.log(row);
    
    this.deleteFunction(row.id)
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.length > 0) {
      this.columns = Object.keys(this.data[0]);
    } else {
      this.columns = [];
    }
  }
}

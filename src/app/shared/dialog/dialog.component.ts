// dialog.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormComponent } from "../form/form.component";
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule, FormComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  @Input() visible: boolean = false;
  @Input() inputFields: any[] = [];
  @Input() title: string = '';
  @Input() form!: FormGroup;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() formSubmit = new EventEmitter<void>();

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSubmitForm() {
    this.formSubmit.emit(); // Forward to parent
  }
}

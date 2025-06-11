import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 
// CommonModule includes NgFor, NgIf
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message'; // For p-message (optional, can use small tag with p-error)
import { TooltipModule } from 'primeng/tooltip'; // For pTooltip if needed
// import { FormField } from '../../model/login';
import { RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';



@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule, // Provides NgFor, NgIf, etc.
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule, // If using p-message for validation
    TooltipModule,
    InputGroupModule, InputGroupAddonModule, CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule, RouterLink
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() form!: FormGroup;
  @Input() fields!: any;
  @Input() fetchError!: string
  @Input() submitText: string = 'Submit';
  @Output() clearFetchError = new EventEmitter<void>();

  @Output() formSubmit = new EventEmitter<void>();

  onInputChange() {
    if (this.fetchError) {
      this.clearFetchError.emit();
    }
  }


  onFormSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  // Helper to get a form control for validation messages and applying p-invalid
  getControl(name: string) {
    return this.form.get(name);
  }

  // Helper to determine if a field is invalid and touched/dirty for p-invalid class
  isInvalid(fieldName: string): boolean {
    const control = this.getControl(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}


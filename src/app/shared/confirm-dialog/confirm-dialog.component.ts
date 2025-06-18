import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-confirm-dialog',
  imports: [ConfirmDialog, ButtonModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  @Input() confirmedText = ''
  position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }
  @Input() confirmedFunction!: () => void;
  @Input() confirmedQuestion = ''
  @Input() confirmedButtonIcon = ''
  @Input() confirmedBtnClass = ''
  function(position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
    this.position = position;

    this.confirmationService.confirm({
      message: this.confirmedQuestion,
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      rejectButtonStyleClass: 'p-button-text',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        text: true,
      },
      acceptButtonProps: {
        label: 'Accept',
        text: true,
      },
      accept: () => {
        debugger;
        if (typeof this.confirmedFunction === 'function') {
          this.confirmedFunction();
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: this.confirmedText });
        } else {
          console.warn('confirmedFunction is not a function');
          console.log(this.confirmedFunction);

        }


      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Process incomplete',
          life: 3000,
        });
      },
      key: 'positionDialog',
    });
  }

}

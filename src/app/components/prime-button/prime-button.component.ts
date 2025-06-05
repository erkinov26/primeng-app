import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'prime-button',
  templateUrl: 'prime-button.component.html',
  standalone: true,
  imports: [ButtonModule]
})
export class PrimeButtonComponent { }
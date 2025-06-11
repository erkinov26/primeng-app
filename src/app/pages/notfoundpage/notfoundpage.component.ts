import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfoundpage',
  imports: [CardModule, ButtonModule],
  templateUrl: './notfoundpage.component.html',
  styleUrl: './notfoundpage.component.css'
})
export class NotfoundpageComponent {
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }

}

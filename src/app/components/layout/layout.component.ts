// app.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-layout',
  imports: [InputGroupModule, CommonModule, MenubarModule, RouterOutlet, InputTextModule, TooltipModule, InputGroupAddonModule, DrawerModule, ButtonModule, Menu, ToastModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  items: MenuItem[] = [];
  visible: boolean = false
  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'bx bx-home', routerLink: '/' },
      { label: 'Groups', icon: 'bx bx-group', routerLink: '/groups' },
      { label: 'Teachers', icon: 'bx bx-chalkboard', routerLink: '/teachers' },
      { label: 'Pupils', icon: 'bx bx-user', routerLink: '/pupils' },

    ];
  }

}

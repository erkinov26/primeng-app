import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { PupilsComponent } from './pages/pupils/pupils.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'groups', component: ClassesComponent },
      { path: 'pupils', component: PupilsComponent },
    ]
  },
  {
    path: 'notfoundpage',
    component: NotfoundpageComponent,
  },
  {
    path: '**',
    redirectTo: 'notfoundpage',
    pathMatch: 'full'
  }
];

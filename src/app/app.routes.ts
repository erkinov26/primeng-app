import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'registration',
  component: RegistrationComponent
}];

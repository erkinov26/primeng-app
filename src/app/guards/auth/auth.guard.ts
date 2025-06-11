import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log('AuthGuard token:', token); // Shu log chiqayaptimi?
    if (token) return true;
    this.router.navigate(['/login']);
    return false;
  }


}
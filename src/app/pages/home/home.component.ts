import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get('http://localhost:5000/admin/me', { headers }).subscribe({
      next: (userData) => {
        console.log('Logged-in user data:', userData);
      },
      error: (err) => {
        console.error('getMe error:', err);
      }
    });
  }
}

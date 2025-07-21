import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  user: any = null;
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/api/users/me').subscribe({
      next: (u) => (this.user = u),
      error: () => (this.user = null),
    });
  }
}

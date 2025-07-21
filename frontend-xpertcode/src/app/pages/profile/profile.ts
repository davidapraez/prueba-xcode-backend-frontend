import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

interface ProfileResponse {
  user: { _id: string; name: string; email: string };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  user: ProfileResponse['user'] | null = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token') || '';

    this.http
      .get<ProfileResponse>('http://localhost:3000/api/users/me', {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .subscribe({
        next: (res) => (this.user = res.user),
        error: () => (this.user = null),
      });
  }
}

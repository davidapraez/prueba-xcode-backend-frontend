import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterResponse } from '../../models/register-response.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Registro de Usuario</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput [(ngModel)]="name" name="name" required />
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Email</mat-label>
              <input
                matInput
                type="email"
                [(ngModel)]="email"
                name="email"
                required
              />
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input
                matInput
                type="password"
                [(ngModel)]="password"
                name="password"
                required
              />
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              class="full-width"
            >
              Registrarse
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions class="center-link">
          <span>¿Ya tienes una cuenta?</span>
          <button mat-button color="accent" routerLink="/login">
            Inicia sesión
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http
      .post<RegisterResponse>('http://localhost:3000/api/users/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          alert('Registro exitoso: ' + res.user.name);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en registro', err);
          alert('No se pudo registrar');
        },
      });
  }
}

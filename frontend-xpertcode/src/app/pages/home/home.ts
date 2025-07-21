import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <h1>Bienvenido al Aplicativo</h1>
      <nav class="menu">
        <button routerLink="/cats" mat-raised-button color="primary">
          Ver Gatos
        </button>
        <!-- Agrega más botones aquí -->
      </nav>
    </div>
  `,
  styleUrls: ['./home.css'],
})
export class HomeComponent {}

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardLayoutComponent } from './layout/dashboard-layout';
import { BreedsTableComponent } from './pages/breeds-table/breeds-table';
import { CatBreedsComponent } from './pages/cat-breeds/cat-breeds';
import { ProfileComponent } from './pages/profile/profile';
import { AuthGuard } from './core/auth.guard';
// import { AuthGuard } from './guards/auth.guard';  ← si ya lo tienes

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'cats', pathMatch: 'full' },
      { path: 'cats', component: CatBreedsComponent },
      { path: 'cats-table', component: BreedsTableComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];

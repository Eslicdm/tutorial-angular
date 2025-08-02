import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Auth },
  { path: 'home', component: Home },
];

import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from './auth.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    NgOptimizedImage,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
  this.authService.saveUser(res);
  const role = res.role;
  if (role === 'Patient') this.router.navigate(['/doctors']);
  else if (role === 'Doctor') this.router.navigate(['/doctor-dashboard']);
  else if (role === 'Admin') this.router.navigate(['/admin-dashboard']);
},
      error: () => {
        this.errorMessage = 'Invalid email or password!';
      },
    });
  }
}

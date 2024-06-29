import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ILoginUser } from '../../interfaces/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: ILoginUser = {
    username: '',
    password: ''
  }

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }
  
  signIn() {
    this.authSvc.login(this.login).subscribe({
      next: (data) => {
        this.router.navigate(['/trip']);
        console.log('Login successful');
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}

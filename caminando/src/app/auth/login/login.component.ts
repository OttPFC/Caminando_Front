import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ILoginUser } from '../../interfaces/login-user';
import { IRegisterUser } from '../../interfaces/register-user';
import iziToast from 'izitoast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('signUp', { static: false }) signUpButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('signIn', { static: false }) signInButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('container', { static: false }) container!: ElementRef<HTMLDivElement>;

  login: ILoginUser = {
    username: '',
    password: ''
  };

  registerData: Partial<IRegisterUser> = {};
  
  constructor(
    private authSvc: AuthService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.signUpButton?.nativeElement.addEventListener('click', () => {
      this.container?.nativeElement.classList.add('right-panel-active');
    });

    this.signInButton?.nativeElement.addEventListener('click', () => {
      this.container?.nativeElement.classList.remove('right-panel-active');
    });
  }

  entra(): void {
    this.authSvc.login(this.login).subscribe({
      next: (data) => {
        iziToast.success({
          title: 'Success',
          message: 'Login successful!',
          position: 'bottomCenter'
        });
        setTimeout(() => {
          this.router.navigate(['/trip']);
        }, 2000);
        console.log('Login successful');
      },
      error: (error) => {
        console.error('Login failed', error);
        iziToast.error({
          title: 'Error',
          message: 'Login failed. Please try again.',
          position: 'bottomCenter'
        });
      }
    });
  }
  register(): void {
    this.authSvc.register(this.registerData).subscribe({
      next: (data) => {
        iziToast.success({
          title: 'Success',
          message: 'Registration successful!',
          position: 'bottomRight'
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        console.log('Registration successful');
      },
      error: (error) => {
        console.error('Registration failed', error);
        iziToast.error({
          title: 'Error',
          message: 'Registration failed. Please try again.',
          position: 'bottomCenter'
        });
      }
    });
  }
}

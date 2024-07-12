import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ILoginUser } from '../../interfaces/login-user';
import { IRegisterUser } from '../../interfaces/register-user';
import iziToast from 'izitoast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('register')) {
        this.showRegisterForm();
      } else if (params.get('login')) {
        this.showLoginForm();
      }
    });
  }

  ngAfterViewInit(): void {
    this.signUpButton?.nativeElement.addEventListener('click', () => {
      this.container?.nativeElement.classList.add('right-panel-active');
    });

    this.signInButton?.nativeElement.addEventListener('click', () => {
      this.container?.nativeElement.classList.remove('right-panel-active');
    });
  }

  showRegisterForm(): void {
    setTimeout(() => {
      this.container?.nativeElement.classList.add('right-panel-active');
    }, 0); // Using timeout to ensure the view is fully initialized
  }

  showLoginForm(): void {
    setTimeout(() => {
      this.container?.nativeElement.classList.remove('right-panel-active');
    }, 0); // Using timeout to ensure the view is fully initialized
  }

  entra(): void {
    this.authSvc.login(this.login).subscribe({
      next: (data) => {
        iziToast.success({
          title: 'Success',
          message: 'Welcome traveler',
          position: 'bottomCenter'
        });
        setTimeout(() => {
          this.router.navigate(['/trip']);
        }, 1000);
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
          this.router.navigate(['/login', { login: true }]);
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

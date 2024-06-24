import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { IRegisterUser } from '../../interfaces/register-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData:Partial<IRegisterUser> = {}
  constructor(private authService: AuthService, private router:Router ) { }

  signUp(){
    this.authService.register(this.registerData)
    .subscribe(data => {
      this.router.navigate(['login'])
    })
  }
  
}

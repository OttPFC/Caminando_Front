import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { IRegisterUser } from '../../interfaces/register-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user: IRegisterUser = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    admin: false
  };
  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('User registered successfully');
        // Qui puoi aggiungere reindirizzamento o mostrare un messaggio di successo
      },
      error: (error) => {
        console.error('Registration failed', error);
        // Gestione dell'errore
      }
    });
  }
  
}

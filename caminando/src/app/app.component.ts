import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'caminando';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //this.authService.restoreUser();
  }
}

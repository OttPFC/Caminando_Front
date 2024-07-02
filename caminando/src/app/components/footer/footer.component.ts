import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IRegisterUser } from '../../interfaces/register-user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  user: IRegisterUser | undefined;

  
  
  

  constructor(private authSvc:AuthService) { }

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })
  }
}

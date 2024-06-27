import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRegisterUser } from '../../interfaces/register-user';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: IRegisterUser | undefined;

  
  
  

  constructor(private authSvc:AuthService) { }

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })
  }

  logout(){
    this.authSvc.logout();
  }
}

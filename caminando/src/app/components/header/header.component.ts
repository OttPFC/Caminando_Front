import { Component, OnInit } from '@angular/core';
import { IRegisterUser } from '../../interfaces/register-user';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import iziToast from 'izitoast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: IRegisterUser | undefined;
  users: IRegisterUser[] = [];
  errorMessage: string | null = null;

  constructor(
    private authSvc: AuthService, 
    private usrSvc: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    });
    this.loadUser();
  }

  loadUser() {
    this.authSvc.user$.subscribe({
      next: (user) => {
        this.user = user || undefined;
        if (this.user) {
          this.getUser(this.user.id);
        }
      },
      error: (err) => {
        this.errorMessage = 'Errore nel caricamento dell\'utente';
      }
    });
  }

  getUser(id: number) {
    this.usrSvc.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero dell\'utente';
      }
    });
  }

  searchUsers(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target?.value;
    if (!query || query.length < 3) {
      this.users = [];
      return;
    }
    this.usrSvc.searchUsersByName(query).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.errorMessage = 'Errore nella ricerca degli utenti';
      }
    });
  }
  selectUser(user: IRegisterUser) {
    this.users = [];
    this.router.navigate(['/profilePage', user.id]);
  }

  clearResults() {
    this.users = [];
  }
  logout(){
    this.authSvc.logout();
    iziToast.success({
      title: 'Logout',
      message: 'See you traveler',
      position: 'bottomCenter'
    });
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1000);
  }
}

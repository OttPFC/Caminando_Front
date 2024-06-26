import { Component, OnInit } from '@angular/core';
import { IRegisterUser } from '../../interfaces/register-user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  users: IRegisterUser[] = [];
  selectedUser?: IRegisterUser;
  errorMessage: string | null = null;

  constructor(private usrSvc: UserService, private authService: AuthService) {}

  ngOnInit() {
    console.log("start")
    this.authService.authSubj.subscribe({
      
      next: (user) => {
        console.log("start")
        if (user && user.id) {
          console.log("start")
          console.log(user.id);
          this.getUserDetails(user.id);
          console.log("start")
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to get user from AuthService';
        console.error('Error fetching user from AuthService:', err);
      }
    });
  }

  loadUsers() {
    this.usrSvc.getAllUsers(0, 10).subscribe({
      next: (response) => {
        this.users = response.content;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users';
        console.error('Error fetching users:', err);
      }
    });
  }

  getUserDetails(id: number) {
    this.usrSvc.getUserById(id).subscribe({
      next: (user) => {
        this.selectedUser = user;
        this.errorMessage = null;
        console.log('User details:', user);
      },
      error: (err) => {
        this.errorMessage = 'Error fetching user details';
        console.error('Error fetching user details:', err);
      }
    });
  }
}

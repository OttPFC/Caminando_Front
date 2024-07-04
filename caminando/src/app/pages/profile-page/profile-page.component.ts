import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegisterUser } from '../../interfaces/register-user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { NavigationService } from '../../services/general/navigation.service';
import { Router } from '@angular/router';
import iziToast from 'izitoast';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  users: IRegisterUser[] = [];
  user: IRegisterUser | undefined;
  userForm: FormGroup;
  errorMessage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private usrSvc: UserService, 
    private authService: AuthService,
    private navigationService: NavigationService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: [''],
      bio:[''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.usrSvc.users$.subscribe(users => {
      this.users = users;
    });
    this.loadUser();
  }

  loadUser() {
    this.authService.user$.subscribe({
      next: (user) => {
        this.user = user || undefined;
        if (this.user) {
          this.userForm.patchValue(this.user);
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
        this.userForm.patchValue(user);
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero dell\'utente';
      }
    });
  }

  update() {
    if (this.userForm.valid && this.user) {
      const updatedUser = { ...this.user, ...this.userForm.value };
      this.usrSvc.updateUser(this.user.id, updatedUser).subscribe({
        next: () => {
          console.log('Utente aggiornato con successo');
          iziToast.success({
            title: 'Success',
            message: 'Profile successfully updated.',
            position: 'bottomCenter'
          });
          setTimeout(() => {
            window.location.reload();;
          }, 2000);
        },
        error: (error) => {
          console.error('Errore durante l\'aggiornamento dell\'utente', error);
          this.errorMessage = 'Errore durante l\'aggiornamento dell\'utente';
        }
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  addAvatar() {
    if (this.selectedFile && this.user) {
      this.usrSvc.uploadProfileImage(this.user.id, this.selectedFile).subscribe({
        next: (user) => {
          console.log('Immagine del profilo caricata con successo');
          this.user = user;  
          window.location.reload();
          iziToast.success({
            title: 'Success',
            message: 'Upload completed',
            position: 'bottomCenter'
          });
        },
        error: (error) => {
          console.error('Errore durante il caricamento dell\'immagine del profilo', error);
          this.errorMessage = 'Errore durante il caricamento dell\'immagine del profilo';
        }
      });
    } else {
      console.error('Nessun file selezionato o utente non disponibile');
      this.errorMessage = 'Nessun file selezionato o utente non disponibile';
    }
  }
}

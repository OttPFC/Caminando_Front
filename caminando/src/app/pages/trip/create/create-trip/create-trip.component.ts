import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../../../services/trip.service';
import { AuthService } from '../../../../auth/auth.service';
import { ITrip } from '../../../../interfaces/trip';
import iziToast from 'izitoast';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  tripForm: FormGroup;
  userId: number | null = null;
  isLoading = false;
  successMessage = '';
  selectedFile: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tripSvc: TripService,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      privacy: ['PUBLIC', Validators.required],
      status: ['PENDING', Validators.required]
    });
  }

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  addTrip() {
    if (this.tripForm.valid) {
      this.isLoading = true;
      const trip: ITrip = this.tripForm.value;
      this.tripSvc.addTrip(trip).subscribe({
        next: (createdTrip) => {
          console.log('Trip creato con successo:', createdTrip);
          if (this.selectedFile) {
            this.tripSvc.uploadProfileImage(createdTrip.id, this.selectedFile).subscribe({
              next: () => {
                console.log('Immagine del profilo caricata con successo');
                iziToast.success({
                  title: 'Success',
                  message: 'Your trip has been saved',
                  position: 'bottomCenter'
                });
                this.router.navigate(['/trip']);
              },
              error: (error) => {
                this.isLoading = false;
                console.error('Errore durante il caricamento dell\'immagine del profilo:', error);
                iziToast.error({
                  title: 'Error',
                  message: 'Your image was not saved!',
                  position: 'bottomCenter'
                });
              }
            });
          } else {
            this.isLoading = false;
            iziToast.error({
              title: 'Error',
              message: 'Your Trip was not saved!',
              position: 'bottomCenter'
            });
            this.router.navigate(['/trip']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          iziToast.error({
            title: 'Error',
            message: 'Login failed. Please try again.',
            position: 'bottomCenter'
          });
          console.error('Errore durante la creazione del trip:', error);
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
    if (this.selectedFile && this.userId) {
      this.tripSvc.uploadProfileImage(this.userId, this.selectedFile).subscribe({
        next: (trip) => {
          console.log('Immagine del profilo caricata con successo');
          window.location.reload();
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

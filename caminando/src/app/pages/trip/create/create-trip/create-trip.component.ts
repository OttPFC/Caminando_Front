import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../../../services/trip.service';
import { UserService } from '../../../../services/user.service';
import { ITrip } from '../../../../interfaces/trip';
import { AuthService } from '../../../../auth/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private tripSvc: TripService,
    private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router // Iniettare il Router
  ) {
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      privacy: ['PUBLIC', Validators.required], // In maiuscolo
      status: ['PENDING', Validators.required]   // In maiuscolo
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
          this.successMessage = 'Trip creato con successo! Redirect in 3 secondi...';
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/trip']);
          }, 3000);
        },
        error: (error) => {
          console.error('Errore durante la creazione del trip:', error);
          this.isLoading = false;
        }
      });
    }
  }
}

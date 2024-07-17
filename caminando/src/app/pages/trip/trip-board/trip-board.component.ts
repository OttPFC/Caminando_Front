import { Component, EventEmitter, Output } from '@angular/core';
import { IRegisterUser } from '../../../interfaces/register-user';
import { ITrip } from '../../../interfaces/trip';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../services/user.service';
import { TripService } from '../../../services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-board',
  templateUrl: './trip-board.component.html',
  styleUrl: './trip-board.component.scss'
})
export class TripBoardComponent {

  @Output() tripSelected = new EventEmitter<number>();
  
  errorMessage: string | null = null;
  user: IRegisterUser | undefined;
  users: IRegisterUser[] = [];
  trips : ITrip[] = [];

  constructor(private authService: AuthService, 
    private usrSvc : UserService, 
    private tripService:TripService, 
    private router:Router){}
    
  ngOnInit() {
    console.log('DashboardComponent#ngOnInit called');
    
    this.loadUser();
    this.getAllTrips(0, 10);
  }

  loadUser() {
    this.authService.user$.subscribe({
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

  getAllTrips(page: number, pageSize: number) {
    this.tripService.getAllTrips(page, pageSize).subscribe({
      next: (trips) => {
        console.log('Trips received:', trips); 
        this.trips = trips;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero delle tratte';
      }
    });
  }
  selectTrip(tripId: number) {
    this.tripSelected.emit(tripId);
  }
  

  
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { IRegisterUser } from '../../interfaces/register-user';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { TripService } from '../../services/trip.service';
import { ITrip } from '../../interfaces/trip';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Output() tripSelected = new EventEmitter<number>();
  map!: mapboxgl.Map;
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
    this.initializeMap();
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
        console.log('Trips received:', trips); // Aggiungi questo log
        this.trips = trips;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero delle tratte';
      }
    });
  }

  

  initializeMap() {
    
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiYWxlMDk3IiwiYSI6ImNsd3N5MmRnajAxM2UybHIxa3IyNThvaGIifQ.Yo5tbnRNwBRMt7u4lfauqA';
    
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [position.coords.longitude, position.coords.latitude] as [number, number];
          this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/ale097/clxx1i7jy00yy01qw5hqg7mzi',
            center: userLocation, 
            zoom: 2
          });

          
          new mapboxgl.Marker()
            .setLngLat(userLocation)
            .addTo(this.map);
        },
        (error) => {
          console.error('Error getting user location', error);
          this.initializeMapWithDefaultLocation();
        }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
      this.initializeMapWithDefaultLocation();
    }
  }

  
  initializeMapWithDefaultLocation() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ale097/clxx1i7jy00yy01qw5hqg7mzi',
      center: [12.4964, 41.9028], 
      zoom: 12
    });
  }
}

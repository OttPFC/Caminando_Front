import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../../../interfaces/trip';
import { TripService } from '../../../../services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { UserService } from '../../../../services/user.service';
import { IRegisterUser } from '../../../../interfaces/register-user';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-show-trip',
  templateUrl: './show-trip.component.html',
  styleUrls: ['./show-trip.component.scss']
})
export class ShowTripComponent implements OnInit {

  map!: mapboxgl.Map;

  trip: ITrip | undefined;
  errorMessage: string | null = null;
  trips : ITrip[] = [];
  user: IRegisterUser | undefined;
  users: IRegisterUser[] = [];

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private usrSvc: UserService,  // Aggiungi questa variabile per la gestione degli utenti
  ) {}

  ngOnInit(): void {
    this.initializeMap();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTrip(id);
    this.loadUser();
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

  getTrip(id: number): void {
    this.tripService.getTripById(id).subscribe({
      next: (trip) => {
        this.trip = trip;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero del viaggio';
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

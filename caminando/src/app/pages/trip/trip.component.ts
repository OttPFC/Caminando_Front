import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { IRegisterUser } from '../../interfaces/register-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class DashboardComponent implements OnInit {
  map!: mapboxgl.Map;

  user: IRegisterUser | undefined;

  constructor(private authSvc: AuthService){}
  ngOnInit() {
    console.log('DashboardComponent#ngOnInit called');
    this.initializeMap();
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })
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

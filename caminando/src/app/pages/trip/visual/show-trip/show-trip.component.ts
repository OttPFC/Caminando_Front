import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../../../interfaces/trip';
import { TripService } from '../../../../services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { UserService } from '../../../../services/user.service';
import { IRegisterUser } from '../../../../interfaces/register-user';
import mapboxgl from 'mapbox-gl';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TripSettingsModalComponent } from '../../../../components/trip-settings-modal/trip-settings-modal.component';
import { StepComponent } from '../../../../components/step/step.component';
import { StepService } from '../../../../services/step.service';
import { IStep } from '../../../../interfaces/step';

@Component({
  selector: 'app-show-trip',
  templateUrl: './show-trip.component.html',
  styleUrls: ['./show-trip.component.scss']
})
export class ShowTripComponent implements OnInit {

  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  errorMessage: string | null = null;
  trip: ITrip | undefined;
  user: IRegisterUser | undefined;
  step: IStep[] = [];

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private usrSvc: UserService,
    private modalService: NgbModal,
    private stepService: StepService
  ) {}

  ngOnInit(): void {
    this.initializeMap();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTrip(id);
    this.loadUser();
  }

  openTripSettings() {
    const modalRef = this.modalService.open(TripSettingsModalComponent);
    if (this.trip) {
      modalRef.componentInstance.tripId = this.trip.id; 
    }
  }

  openAddItemModal() {
    const modalRef = this.modalService.open(StepComponent, {
      backdrop: 'static', // Modale non si chiude cliccando fuori
      keyboard: false,    // Modale non si chiude premendo Esc
      windowClass: 'modal-over-section' // Classe personalizzata per il posizionamento
    });
    modalRef.componentInstance.tripId = this.trip?.id;
    modalRef.result.then((result) => {
      if (result) {
        console.log('Step added:', result);
      }
    }, (reason) => {
      console.log('Modal dismissed:', reason);
    });
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

  getTrip(id: number): void {
    this.tripService.getTripById(id).subscribe({
      next: (trip) => {
        this.trip = trip;
        // Initialize marker after getting the trip
        if (this.trip.steps.length > 0) {
          const firstStep = this.trip.steps[0];
          if (firstStep.position) {
            this.marker.setLngLat([firstStep.position.longitude, firstStep.position.latitude]);
          }
        }
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

          this.marker = new mapboxgl.Marker()
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
    const defaultLocation : [number, number] = [12.4964, 41.9028]; // Default location (Rome)
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ale097/clxx1i7jy00yy01qw5hqg7mzi',
      center: defaultLocation,
      zoom: 12
    });

    this.marker = new mapboxgl.Marker()
      .setLngLat(defaultLocation)
      .addTo(this.map); 
  }

  onStepClick(step: IStep) {
    if (step.position) {
      const { longitude, latitude } = step.position;
      this.map.flyTo({
        center: [longitude, latitude],
        essential: true,
        zoom: 8
      });
      this.marker.setLngLat([longitude, latitude]);
    }
  }
}

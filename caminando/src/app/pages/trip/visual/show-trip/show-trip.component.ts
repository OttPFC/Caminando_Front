import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../../../interfaces/trip';
import { TripService } from '../../../../services/trip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-trip',
  templateUrl: './show-trip.component.html',
  styleUrls: ['./show-trip.component.scss']
})
export class ShowTripComponent implements OnInit {
  trip: ITrip | undefined;
  errorMessage: string | null = null;
  trips : ITrip[] = [];

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTrip(id);
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
}

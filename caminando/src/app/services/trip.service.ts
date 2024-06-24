import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITrip } from '../interfaces/trip';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TripService {


  private apiUrl = environment.tripUrl;

  constructor(private http: HttpClient) { }

  addTrip(userId: number, trip: ITrip): Observable<ITrip> {
    return this.http.post<ITrip>(`${this.apiUrl}/user/${userId}/trips`, trip);
  }
}

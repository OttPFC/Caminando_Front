import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITrip } from '../interfaces/trip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {


  private apiUrl = 'http://localhost:8080/api/trip';

  constructor(private http: HttpClient) { }

  addTrip(userId: number, trip: ITrip): Observable<ITrip> {
    return this.http.post<ITrip>(`${this.apiUrl}/user/${userId}/trips`, trip);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITrip } from '../interfaces/trip';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private trip = new BehaviorSubject<ITrip[]>([]);
  trips$ = this.trip.asObservable();

  tripUrl = environment.tripUrl;

  constructor(private http: HttpClient, private authSvc: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authSvc.getAccessToken();
    console.log('Retrieved Token:', token);  // Aggiungi questo log
    if (!token) return new HttpHeaders();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  addTrip(trip: ITrip): Observable<ITrip> {
    return this.http.post<ITrip>(this.tripUrl,trip, {headers : this.getAuthHeaders()});
  }

  getAllTrips(page: number, size: number): Observable<ITrip[]> {
    return this.http.get<{ content: ITrip[] }>(`${this.tripUrl}?page=${page}&size=${size}`, { headers: this.getAuthHeaders() })
      .pipe(map(response => response.content));
  }

  getTripById(id: number): Observable<ITrip> {
    return this.http.get<ITrip>(`${this.tripUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateTrip(id: number, trip: ITrip): Observable<ITrip> {
    return this.http.put<ITrip>(`${this.tripUrl}/${id}`, trip, { headers: this.getAuthHeaders() });
  }

  deleteTrip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.tripUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  fetchAllTrips(page: number, size: number): void {
    this.getAllTrips(page, size).subscribe({
      next: (trips) => this.trip.next(trips),
      error: (error) => console.error('Errore nel recupero delle tratte', error)
    });
  }

}
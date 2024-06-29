import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITrip } from '../interfaces/trip';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient, private authSvc: AuthService) {}

  addTrip(trip: ITrip): Observable<ITrip> {
    const token = this.authSvc.getAccessToken(); // Assicurati che questo metodo recuperi il token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<ITrip>(environment.tripUrl, trip, { headers });
  }
}

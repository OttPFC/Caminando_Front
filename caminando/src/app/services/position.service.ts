import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private baseUrl = 'http://localhost:8080/api/positions'; // URL del tuo backend

  constructor(private http: HttpClient) { }

  getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            observer.next(position);
            observer.complete();
          },
          error => observer.error(error)
        );
      } else {
        observer.error('Geolocation not supported by this browser.');
      }
    });
  }

  sendPosition(stepId: number, position: { latitude: number, longitude: number }): Observable<any> {
    const url = `${this.baseUrl}/step/${stepId}`;
    return this.http.post(url, position);
  }
}

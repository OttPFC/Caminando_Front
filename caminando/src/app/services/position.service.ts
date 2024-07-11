import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { IPosition } from '../interfaces/position';
import { GeocodingFeature } from '../interfaces/geocoding-response';
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private baseUrl = environment.positionUrl
  private geocodingClient = MapboxGeocoding({ accessToken: 'pk.eyJ1IjoiYWxlMDk3IiwiYSI6ImNsd3N5MmRnajAxM2UybHIxa3IyNThvaGIifQ.Yo5tbnRNwBRMt7u4lfauqA' });

  private positionSource = new BehaviorSubject<{ latitude: number, longitude: number, placeName?: string }>({ latitude: 0, longitude: 0 });
  currentPosition = this.positionSource.asObservable();

  private positionSource2 = new BehaviorSubject<IPosition>({ latitude: 0, longitude: 0, timestamp: '', nomeLocalita: '' });
  currentPosition2 = this.positionSource2.asObservable();


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

  updatePosition(position: { latitude: number, longitude: number }) {
    this.positionSource.next(position);
    this.getPlaceName(position.latitude, position.longitude);
  }

  updatePosition2(position: IPosition) {
    this.positionSource2.next(position);
  }
  private getPlaceName2(lat: number, lng: number) {
    const accessToken = 'pk.eyJ1IjoiYWxlMDk3IiwiYSI6ImNsd3N5MmRnajAxM2UybHIxa3IyNThvaGIifQ.Yo5tbnRNwBRMt7u4lfauqA'; 
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;

    this.http.get<any>(url).subscribe(response => {
      if (response.features && response.features.length > 0) {
        const placeName = response.features[0].place_name;
        const timestamp = new Date().toISOString(); // aggiungi un timestamp corrente
        this.positionSource2.next({ latitude: lat, longitude: lng, nomeLocalita: placeName, timestamp: timestamp });
      }
    });
  }
  private getPlaceName(lat: number, lng: number) {
    const accessToken = 'pk.eyJ1IjoiYWxlMDk3IiwiYSI6ImNsd3N5MmRnajAxM2UybHIxa3IyNThvaGIifQ.Yo5tbnRNwBRMt7u4lfauqA'; 
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;

    this.http.get<any>(url).subscribe(response => {
      if (response.features && response.features.length > 0) {
        const placeName = response.features[0].place_name;
        const timestamp = new Date().toISOString(); // aggiungi un timestamp corrente
        this.positionSource.next({ latitude: lat, longitude: lng, placeName });
      }
    });
  }
  searchLocation(query: string): Promise<GeocodingFeature[]> {
    return this.geocodingClient.forwardGeocode({
      query: query,
      limit: 5
    })
    .send()
    .then((response: { body: { features: any; }; }) => response.body.features);
  }
}

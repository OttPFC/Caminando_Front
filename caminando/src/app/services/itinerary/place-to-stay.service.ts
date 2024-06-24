import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlaceToStayService {

  constructor() { }

  private apiUrl = environment.placeToStayUrl;
}

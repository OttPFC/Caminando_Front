import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor() { }

  private apiUrl = environment.restaurantUrl;
}

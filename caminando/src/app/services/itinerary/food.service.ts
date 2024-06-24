import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  private apiUrl = environment.foodUrl;
}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SuggestItineraryService {

  constructor() { }
  private apiUrl = environment.itineraryUrl;
}

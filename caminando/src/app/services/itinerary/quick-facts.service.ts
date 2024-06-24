import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuickFactsService {

  constructor() { }

  private apiUrl = environment.quickFactsUrl;
}

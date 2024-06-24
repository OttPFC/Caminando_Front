import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStep } from '../interfaces/step';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private apiUrl = environment.stepUrl;  // URL del backend

  constructor(private http: HttpClient) {}

  // Aggiungi un nuovo step
  addStep(tripId: number, step: IStep): Observable<IStep> {
    return this.http.post<IStep>(`${this.apiUrl}/trip/${tripId}`, step);
  }
}

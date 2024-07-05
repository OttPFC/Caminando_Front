import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStep } from '../interfaces/step';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private apiUrl = environment.stepUrl;  
  constructor(private http: HttpClient, private authSvc: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authSvc.getAccessToken();
    console.log('Retrieved Token:', token);  
    if (!token) return new HttpHeaders();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  // Aggiungi un nuovo step
  addStep(tripId: number, step: IStep): Observable<IStep> {
    return this.http.post<IStep>(`${this.apiUrl}/${tripId}/create`, step, { headers: this.getAuthHeaders() });
  }
  getAllSteps(page: number, size: number): Observable<IStep[]> {
    return this.http.get<{ content: IStep[] }>(`${this.apiUrl}?page=${page}&size=${size}`, { headers: this.getAuthHeaders() })
      .pipe(map(response => response.content));
  }

}

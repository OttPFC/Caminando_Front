import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { StepPositionModel } from '../interfaces/step-position-model';
import { IStep } from '../interfaces/step';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private apiUrl = environment.stepUrl;

  constructor(private http: HttpClient, private authSvc: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authSvc.getAccessToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  addStep(step: StepPositionModel, tripId: number): Observable<IStep> {
    return this.http.post<IStep>(`${this.apiUrl}/${tripId}/create`, step, { headers: this.getAuthHeaders() });
  }

  getAllSteps(page: number, size: number): Observable<IStep[]> {
    return this.http.get<{ content: IStep[] }>(`${this.apiUrl}?page=${page}&size=${size}`, { headers: this.getAuthHeaders() })
      .pipe(map(response => response.content));
  }

  getStepById(id: number): Observable<IStep> {
    return this.http.get<IStep>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  
  updateStep(id: number, stepRequestDTO: IStep): Observable<IStep> {
    return this.http.put<IStep>(`${this.apiUrl}/${id}`, stepRequestDTO, { headers: this.getAuthHeaders() });
  }

  deleteStep(id: number): Observable<IStep> {
    return this.http.delete<IStep>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }



  uploadStepImages(id: number, files: File[]): Observable<IStep> {
    const formData: FormData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));
    return this.http.patch<IStep>(`${this.apiUrl}/${id}/images`, formData, { headers: this.getAuthHeaders() });
  }
}

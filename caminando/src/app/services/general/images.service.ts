import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.development';
import { Image } from '../../interfaces/image';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private apiUrl = environment.imageUrl;

  constructor(private http: HttpClient, private authSvc: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authSvc.getAccessToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  deleteImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${imageId}`, { headers: this.getAuthHeaders() });
  }

  uploadImages(stepId: number, files: File[]): Observable<void> {
    const formData: FormData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));
    return this.http.patch<void>(`${this.apiUrl}/${stepId}`, formData, { headers: this.getAuthHeaders() });
  }
}

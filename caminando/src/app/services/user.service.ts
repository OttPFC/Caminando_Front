import { Injectable } from '@angular/core';
import { IRegisterUser } from '../interfaces/register-user';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new Subject<IRegisterUser[]>();
  users$ = this.user.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    console.log('Retrieved Token:', token);  // Aggiungi questo log
    if (!token) return new HttpHeaders();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${environment.userUrl}?page=${page}&size=${size}`, { headers: this.getAuthHeaders() });
  }

  getUserById(id: number): Observable<IRegisterUser> {
    return this.http.get<IRegisterUser>(`${environment.userUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateUser(id: number, user: IRegisterUser): Observable<IRegisterUser> {
    return this.http.put<IRegisterUser>(`${environment.userUrl}/${id}`, user, { headers: this.getAuthHeaders() });
  }

  addUserRole(id: number, role: string): Observable<IRegisterUser> {
    return this.http.patch<IRegisterUser>(`${environment.userUrl}/${id}/add-role`, { role }, { headers: this.getAuthHeaders() });
  }

  removeUserRole(id: number, role: string): Observable<IRegisterUser> {
    return this.http.patch<IRegisterUser>(`${environment.userUrl}/${id}/remove-role`, { role }, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.userUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  uploadProfileImage(id: number, file: File): Observable<IRegisterUser> {
    const headers = this.getAuthHeaders();
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.patch<IRegisterUser>(`${environment.userUrl}/${id}/profile-image`, formData, { headers });
  }
}

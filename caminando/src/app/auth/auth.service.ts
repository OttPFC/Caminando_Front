import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IRegisterUser } from '../interfaces/register-user';
import { environment } from '../../environments/environment.development';
import { ILoginUser } from '../interfaces/login-user';
import { Router } from '@angular/router';

type AccessData = {
  accessToken: string,
  user: IRegisterUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  authSubj = new BehaviorSubject<IRegisterUser | null>(null);

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.restoreUser();
  }

  login(loginData: ILoginUser): Observable<AccessData> {
    return this.http.post<AccessData>(this.loginUrl, loginData)
      .pipe(tap(data => {
        this.authSubj.next(data.user);
        localStorage.setItem('accessData', JSON.stringify(data));
        this.autoLogout(data.accessToken);
      }));
  }

  register(newUser: Partial<IRegisterUser>): Observable<AccessData> {
    return this.http.post<AccessData>(this.registerUrl, newUser);
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/login']);
  }

  getAccessToken(): string {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return '';
    const accessData: AccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return '';
    return accessData.accessToken;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  restoreUser() {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return;
    const accessData: AccessData = JSON.parse(userJson);
    if (accessData.accessToken && accessData.user) {
      this.authSubj.next(accessData.user);
      this.autoLogout(accessData.accessToken);
    }
  }

  autoLogout(jwt: string): void {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(jwt);
    if (expirationDate) {
      const expiresInMs = expirationDate.getTime() - new Date().getTime();
      setTimeout(() => {
        this.logout();
      }, expiresInMs);
    }
  }
}

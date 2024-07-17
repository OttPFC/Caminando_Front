import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    return this.authSvc.isLoggedIn$.pipe(
      map(isLoggedIn => {
        console.log('isLoggedIn value:', isLoggedIn);  
        if (isLoggedIn) {
          console.log('User is logged in');
          return true;
        } else {
          console.log('User is not logged in, redirecting to home');
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
  
}

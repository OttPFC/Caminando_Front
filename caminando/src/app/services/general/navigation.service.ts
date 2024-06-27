import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        localStorage.setItem('lastUrl', event.urlAfterRedirects);
      }
    });
  }

  getLastUrl(): string | null {
    return localStorage.getItem('lastUrl');
  }
}

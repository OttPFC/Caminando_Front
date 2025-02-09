import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./auth/auth.module').then(m => {
      console.log('Loaded AuthModule');
      return m.AuthModule;
    }), 
    title: "Caminando" 
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => {
      console.log('Loaded HomeModule');
      return m.HomeModule;
    })
  },
  { 
    path: 'trip',
    loadChildren: () => import('./pages/trip/trip.module').then(m => {
      console.log('Loaded DashboardModule');
      return m.TripModule;
    }),
    title: "Caminando | Trip",
    canActivate: [AuthGuard]
  },
  { 
    path: 'profilePage',
    loadChildren: () => import('./pages/profile-page/profile-page.module').then(m => {
      console.log('Loaded ProfilePageModule');
      return m.ProfilePageModule;
    }),
    title: "Caminando | Profile Page",
    canActivate: [AuthGuard]
  },
  { 
    path: 'itinerary', 
    loadChildren: () => import('./pages/intinerary/intinerary.module').then(m => {
      console.log('Loaded IntineraryModule');
      return m.IntineraryModule;
    }), 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

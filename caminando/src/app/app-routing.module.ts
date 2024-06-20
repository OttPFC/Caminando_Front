import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, 
  { path: 'landingPage', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) }, 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
  { path: 'profilePage', loadChildren: () => import('./pages/profile-page/profile-page.module').then(m => m.  ProfilePageModule) }, 
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
  { path: 'create', loadChildren: () => import('./backOffice/create/create.module').then(m => m.CreateModule) }, 
  { path: 'edit', loadChildren: () => import('./backOffice/edit/edit.module').then(m => m.EditModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

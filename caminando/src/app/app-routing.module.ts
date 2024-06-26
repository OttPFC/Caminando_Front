import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  
  { path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), 
    title: "Caminando"
  }, 
  { path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    
  { path: 'profilePage',
    loadChildren: () => import('./pages/profile-page/profile-page.module').then(m => m.  ProfilePageModule),
    title:"Caminando | Profile Page",
    
  }, 
  { path: 'dashboard', 
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) ,
    
  }, 
  { path: 'create', 
    loadChildren: () => import('./backOffice/create/create.module').then(m => m.CreateModule) ,
    title:"Caminando | Create",
    canActivate: [AuthGuard]
  }, 
  { path: 'edit', 
    loadChildren: () => import('./backOffice/edit/edit.module').then(m => m.EditModule),
    title:"Caminando | Edit",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntineraryComponent } from './intinerary.component';

const routes: Routes = [{ path: '', component: IntineraryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntineraryRoutingModule { }

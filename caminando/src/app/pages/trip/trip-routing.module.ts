import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripComponent } from './trip.component';
import { CreateTripComponent } from './create/create-trip/create-trip.component';
import { ShowTripComponent } from './visual/show-trip/show-trip.component';

const routes: Routes = [
  { path: '', component: TripComponent },
  {
    path: 'createTrip', component: CreateTripComponent,
  },
  {
    path: 'showTrip/:id', component: ShowTripComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }

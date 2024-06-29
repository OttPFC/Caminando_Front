import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './trip-routing.module';
import { DashboardComponent } from './trip.component';
import { CreateTripComponent } from './create/create-trip/create-trip.component';
import { EditTripComponent } from './edit/edit-trip/edit-trip.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowTripComponent } from './visual/show-trip/show-trip.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    CreateTripComponent,
    EditTripComponent,
    ShowTripComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }

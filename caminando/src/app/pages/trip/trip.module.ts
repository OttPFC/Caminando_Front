import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripComponent } from './trip.component';
import { CreateTripComponent } from './create/create-trip/create-trip.component';
import { EditTripComponent } from './edit/edit-trip/edit-trip.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowTripComponent } from './visual/show-trip/show-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSplideModule } from 'ngx-splide';



@NgModule({
  declarations: [
    TripComponent,
    CreateTripComponent,
    EditTripComponent,
    ShowTripComponent,
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSplideModule
    
  ]
})
export class TripModule { }

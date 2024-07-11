import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripComponent } from './trip.component';
import { CreateTripComponent } from './create/create-trip/create-trip.component';
import { EditTripComponent } from './edit/edit-trip/edit-trip.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowTripComponent } from './visual/show-trip/show-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSplideModule } from 'ngx-splide';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PositionComponent } from '../../components/position/position.component';
import { TripBoardComponent } from './trip-board/trip-board.component';
import { StepComponent } from '../../components/step/step.component';
import { TripSettingsModalComponent } from '../../components/trip-settings-modal/trip-settings-modal.component';



@NgModule({
  declarations: [
    TripComponent,
    CreateTripComponent,
    EditTripComponent,
    ShowTripComponent,
    PositionComponent,
    TripBoardComponent,
    StepComponent,
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSplideModule,
    NgbModule
  ],
  
})
export class TripModule { }

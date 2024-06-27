import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntineraryRoutingModule } from './intinerary-routing.module';
import { IntineraryComponent } from './intinerary.component';


@NgModule({
  declarations: [
    IntineraryComponent
  ],
  imports: [
    CommonModule,
    IntineraryRoutingModule
  ]
})
export class IntineraryModule { }

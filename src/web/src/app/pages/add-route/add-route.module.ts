import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRoutePageRoutingModule } from './add-route-routing.module';

import { AddRoutePage } from './add-route.page';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRoutePageRoutingModule,
    PinchZoomModule,
    ReactiveFormsModule
  ],
  declarations: [AddRoutePage]
})
export class AddRoutePageModule {}

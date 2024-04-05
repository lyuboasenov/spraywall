import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRoutePageRoutingModule } from './view-route-routing.module';

import { ViewRoutePage } from './view-route.page';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRoutePageRoutingModule,
    PinchZoomModule
  ],
  declarations: [ViewRoutePage]
})
export class ViewRoutePageModule {}

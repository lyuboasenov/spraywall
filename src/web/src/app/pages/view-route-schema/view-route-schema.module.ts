import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRouteSchemaPageRoutingModule } from './view-route-schema-routing.module';

import { ViewRouteSchemaPage } from './view-route-schema.page';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRouteSchemaPageRoutingModule,
    PinchZoomModule
  ],
  declarations: [ViewRouteSchemaPage]
})
export class ViewRouteSchemaPageModule {}

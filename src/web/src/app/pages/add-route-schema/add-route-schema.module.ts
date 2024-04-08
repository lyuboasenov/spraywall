import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRouteSchemaPageRoutingModule } from './add-route-schema-routing.module';

import { AddRouteSchemaPage } from './add-route-schema.page';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRouteSchemaPageRoutingModule,
    PinchZoomModule
  ],
  declarations: [AddRouteSchemaPage]
})
export class AddRouteSchemaPageModule {}

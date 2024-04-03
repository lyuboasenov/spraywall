import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutesPageRoutingModule } from './routes-routing.module';

import { ViewRoutePage } from './view-route.page';
import { AddRoutePage } from './add-route.page';
import { ListRoutesPage } from './list-routes.page';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutesPageRoutingModule,
    PinchZoomModule
  ],
  declarations: [ViewRoutePage,AddRoutePage,ListRoutesPage]
})
export class RoutesModule { }

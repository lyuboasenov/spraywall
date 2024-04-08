import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRouteDetailsPageRoutingModule } from './add-route-details-routing.module';

import { AddRouteDetailsPage } from './add-route-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRouteDetailsPageRoutingModule
  ],
  declarations: [AddRouteDetailsPage]
})
export class AddRouteDetailsPageModule {}

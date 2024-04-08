import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRouteDetailsPageRoutingModule } from './view-route-details-routing.module';

import { ViewRouteDetailsPage } from './view-route-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRouteDetailsPageRoutingModule
  ],
  declarations: [ViewRouteDetailsPage]
})
export class ViewRouteDetailsPageModule {}

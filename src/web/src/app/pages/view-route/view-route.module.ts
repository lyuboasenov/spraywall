import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRoutePageRoutingModule } from './view-route-routing.module';

import { ViewRoutePage } from './view-route.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRoutePageRoutingModule
  ],
  declarations: [ViewRoutePage]
})
export class ViewRoutePageModule {}

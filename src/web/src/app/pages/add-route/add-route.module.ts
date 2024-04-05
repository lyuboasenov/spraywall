import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRoutePageRoutingModule } from './add-route-routing.module';

import { AddRoutePage } from './add-route.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRoutePageRoutingModule
  ],
  declarations: [AddRoutePage]
})
export class AddRoutePageModule {}

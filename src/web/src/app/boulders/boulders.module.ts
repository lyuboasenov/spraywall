import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BouldersPageRoutingModule } from './boulders-routing.module';

import { BoulderPage } from './boulder.page';
import { AddBoulderPage } from './add-boulder.page';
import { ListBouldersPage } from './list-boulders.page';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BouldersPageRoutingModule,
    PinchZoomModule
  ],
  declarations: [BoulderPage,AddBoulderPage,ListBouldersPage]
})
export class BouldersModule { }

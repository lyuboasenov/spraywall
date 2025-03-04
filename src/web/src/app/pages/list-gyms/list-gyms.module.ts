import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListGymsPageRoutingModule } from './list-gyms-routing.module';

import { ListGymsPage } from './list-gyms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListGymsPageRoutingModule
  ],
  declarations: [ListGymsPage]
})
export class ListGymsPageModule {}

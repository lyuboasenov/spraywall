import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRoutesPageRoutingModule } from './list-routes-routing.module';

import { ListRoutesPage } from './list-routes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRoutesPageRoutingModule
  ],
  declarations: [ListRoutesPage]
})
export class ListRoutesPageModule {}

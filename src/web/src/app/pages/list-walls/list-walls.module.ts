import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListWallsPageRoutingModule } from './list-walls-routing.module';

import { ListWallsPage } from './list-walls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListWallsPageRoutingModule
  ],
  declarations: [ListWallsPage]
})
export class ListWallsPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListWallsPage } from './list-walls.page';

const routes: Routes = [
  {
    path: '',
    component: ListWallsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListWallsPageRoutingModule {}

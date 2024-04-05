import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRoutesPage } from './list-routes.page';

const routes: Routes = [
  {
    path: '',
    component: ListRoutesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutesPageRoutingModule {}

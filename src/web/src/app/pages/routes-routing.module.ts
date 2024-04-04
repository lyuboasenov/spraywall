import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRoutePage } from './view-route.page';
import { ListRoutesPage } from './list-routes.page';
import { AddRoutePage } from './add-route.page';

const routes: Routes = [
  {
    path: '',
    component: ListRoutesPage
  },
  {
    path: 'add',
    component: AddRoutePage
  },
  {
    path: ':id',
    component: ViewRoutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesPageRoutingModule {}

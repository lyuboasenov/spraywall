import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRouteDetailsPage } from './add-route-details.page';

const routes: Routes = [
  {
    path: '',
    component: AddRouteDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRouteDetailsPageRoutingModule {}

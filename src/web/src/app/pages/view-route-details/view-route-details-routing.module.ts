import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRouteDetailsPage } from './view-route-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRouteDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRouteDetailsPageRoutingModule {}

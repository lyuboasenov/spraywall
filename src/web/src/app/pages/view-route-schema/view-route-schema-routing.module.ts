import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRouteSchemaPage } from './view-route-schema.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRouteSchemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRouteSchemaPageRoutingModule {}

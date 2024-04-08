import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRouteSchemaPage } from './add-route-schema.page';

const routes: Routes = [
  {
    path: '',
    component: AddRouteSchemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRouteSchemaPageRoutingModule {}

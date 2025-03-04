import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListGymsPage } from './list-gyms.page';

const routes: Routes = [
  {
    path: '',
    component: ListGymsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListGymsPageRoutingModule {}

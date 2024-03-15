import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoulderPage } from './boulder.page';
import { ListBouldersPage } from './list-boulders.page';
import { AddBoulderPage } from './add-boulder.page';

const routes: Routes = [
  {
    path: '',
    component: ListBouldersPage
  },
  {
    path: 'add',
    component: AddBoulderPage
  },
  {
    path: ':id',
    component: BoulderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BouldersPageRoutingModule {}

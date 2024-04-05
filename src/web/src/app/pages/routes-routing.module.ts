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
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'add-route',
    loadChildren: () => import('./add-route/add-route.module').then( m => m.AddRoutePageModule)
  },
  {
    path: 'view-route',
    loadChildren: () => import('./view-route/view-route.module').then( m => m.ViewRoutePageModule)
  },
  {
    path: 'list-routes',
    loadChildren: () => import('./list-routes/list-routes.module').then( m => m.ListRoutesPageModule)
  },
  {
    path: 'list-walls',
    loadChildren: () => import('./list-walls/list-walls.module').then( m => m.ListWallsPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesPageRoutingModule {}

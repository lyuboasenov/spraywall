import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'routes',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'USER'
    },
    pathMatch: 'full'
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutPageModule),
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule),
    pathMatch: 'full'
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule),
    pathMatch: 'full'
  },
  {
    path: 'routes',
    loadChildren: () => import('./pages/list-routes/list-routes.module').then(m => m.ListRoutesPageModule),
    pathMatch: 'full'
  },
  {
    path: 'routes/add/details',
    loadChildren: () => import('./pages/add-route-details/add-route-details.module').then(m => m.AddRouteDetailsPageModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'routes/add',
    loadChildren: () => import('./pages/add-route-schema/add-route-schema.module').then(m => m.AddRouteSchemaPageModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'routes/:id',
    loadChildren: () => import('./pages/view-route-schema/view-route-schema.module').then(m => m.ViewRouteSchemaPageModule),
    pathMatch: 'full'
  },
  {
    path: 'routes/:id/details',
    loadChildren: () => import('./pages/view-route-details/view-route-details.module').then(m => m.ViewRouteDetailsPageModule),
    pathMatch: 'full'
  },
  // {
  //   path: 'routes/add',
  //   loadChildren: () => import('./pages/add-route/add-route.module').then(m => m.AddRoutePageModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'routes/:id',
  //   loadChildren: () => import('./pages/view-route/view-route.module').then(m => m.ViewRoutePageModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'walls',
    loadChildren: () => import('./pages/list-walls/list-walls.module').then(m => m.ListWallsPageModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

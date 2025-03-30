import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gyms',
    pathMatch: 'full'
  },
  {
    path: '/',
    redirectTo: 'gyms',
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
    path: 'gyms',
    loadChildren: () => import('./pages/list-gyms/list-gyms.module').then(m => m.ListGymsPageModule),
    pathMatch: 'full'
  },
  {
    path: 'gyms/:id/walls',
    loadChildren: () => import('./pages/list-walls/list-walls.module').then(m => m.ListWallsPageModule),
    pathMatch: 'full'
  },
  {
    path: 'gyms/:gymId/walls/:wallId/routes',
    loadChildren: () => import('./pages/list-routes/list-routes.module').then(m => m.ListRoutesPageModule),
    pathMatch: 'full'
  },
  {
    path: 'gyms/:gymId/walls/:wallId/routes/add/details',
    loadChildren: () => import('./pages/add-route-details/add-route-details.module').then(m => m.AddRouteDetailsPageModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'gyms/:gymId/walls/:wallId/routes/edit/:id/details',
    loadChildren: () => import('./pages/add-route-details/add-route-details.module').then(m => m.AddRouteDetailsPageModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'gyms/:gymId/walls/:wallId/routes/add',
    loadChildren: () => import('./pages/add-route-schema/add-route-schema.module').then(m => m.AddRouteSchemaPageModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'gyms/:gymId/walls/:wallId/routes/edit/:id',
    loadChildren: () => import('./pages/add-route-schema/add-route-schema.module').then(m => m.AddRouteSchemaPageModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'gyms/:gymId/walls/:wallId/routes/:id',
    loadChildren: () => import('./pages/view-route-schema/view-route-schema.module').then(m => m.ViewRouteSchemaPageModule),
    pathMatch: 'full'
  },
  {
    path: 'gyms/:gymId/walls/:wallId/routes/:id/details',
    loadChildren: () => import('./pages/view-route-details/view-route-details.module').then(m => m.ViewRouteDetailsPageModule),
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

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
   {
      path: '',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
   },
   {
      path: 'profile',
      loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
      canActivate: [AuthGuard],
      data: {
         role: 'USER'
      }
   },
   {
     path: 'logout',
     loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
   },
   {
     path: 'signup',
     loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
   },
   {
     path: 'not-found',
     loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
   },
   {
     path: 'routes',
     loadChildren: () => import('./pages/list-routes/list-routes.module').then( m => m.ListRoutesPageModule),
     canActivate: [AuthGuard]
   },
   {
     path: 'routes/add',
     loadChildren: () => import('./pages/add-route/add-route.module').then( m => m.AddRoutePageModule),
     canActivate: [AuthGuard]
   },
   {
     path: 'routes/:id',
     loadChildren: () => import('./pages/view-route/view-route.module').then( m => m.ViewRoutePageModule),
     canActivate: [AuthGuard]
   },
   {
     path: 'walls',
     loadChildren: () => import('./pages/list-walls/list-walls.module').then( m => m.ListWallsPageModule),
     canActivate: [AuthGuard]
   }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }

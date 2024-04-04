import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
   {
      path: '',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
   },
   {
      path: 'routes',
      loadChildren: () => import('./pages/routes.module').then(m => m.RoutesModule),
      canActivate: [AuthGuard]
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
   }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }

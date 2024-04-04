import { Component } from '@angular/core';
import { RouteService } from '../services/route.service';
import { Route } from '../models/route';
import { AuthService } from '../services/auth.service';

@Component({
   selector: 'app-list-routes',
   templateUrl: './list-routes.page.html',
   styleUrls: ['./list-routes.page.scss'],
})
export class ListRoutesPage {
   public routes: Route[] = [];
   public selectedRoute?: Route;

   private _user = this.authService.getUser();

   constructor(private routeService: RouteService, private authService: AuthService) {
      this.routeService.getAll().then((routes: Route[]) => {
         this.routes = routes;
      });
   }

   onSelect(b: Route) {
      this.selectedRoute = b;
   }

   logout() {
      this.authService.logout();
   }
}

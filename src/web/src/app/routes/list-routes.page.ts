import { Component } from '@angular/core';
import { RouteService } from '../services/route.service';
import { Route } from '../models/route';

@Component({
  selector: 'app-list-boulders',
  templateUrl: './list-boulders.page.html',
  styleUrls: ['./list-boulders.page.scss'],
})
export class ListRoutesPage {
  public routes: Route[] = [];
  public selectedRoute?: Route;

  constructor(private routeService: RouteService) {
    this.routeService.getAll().then((routes: Route[]) => {
      this.routes = routes;
    });
  }

  onSelect(b: Route) {
    this.selectedRoute = b;
  }
}

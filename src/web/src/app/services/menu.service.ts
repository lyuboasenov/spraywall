import { Injectable } from '@angular/core';
import { WallService } from './wall.service';
import { GymService } from './gym.service';
import { RouteService } from './route.service';
import { Wall } from '../models/wall/wall';
import { Gym } from '../models/gym/gym';
import { Route } from '../models/route/route';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public appPages: any[] = [{ title: 'Gyms', url: '/gyms', icon: 'reorder-four' }];

  private lastGym!: Gym;
  private lastWall!: Wall;
  private lastRoute!: Route;

  constructor(private gymService: GymService, private wallService: WallService, private routeService: RouteService) { }

  async navigatedToGymsPage() {
    this.appPages = [];
    this.addGymsRoute();
  }

  async navigatedToWallsPage(gymId: string) {
    this.appPages = [];
    this.addGymsRoute();
    this.addGymRoute(gymId);
  }

  async navigatedToRoutesPage(gymId: string, wallId: string) {
    this.appPages = [];
    this.addGymsRoute();
    this.addGymRoute(gymId);
    this.addWallRoute(gymId, wallId);
  }

  async navigatedToSchemaPage(gymId: string, wallId: string, routeId: string) {
    this.appPages = [];
    this.addGymsRoute();
    this.addGymRoute(gymId);
    this.addWallRoute(gymId, wallId);
    this.addRouteRoute(gymId, wallId, routeId);
  }

  async navigatedToDetailsPage(gymId: string, wallId: string, routeId: string) {
    this.appPages = [];
    this.addGymsRoute();
    this.addGymRoute(gymId);
    this.addWallRoute(gymId, wallId);
    this.addRouteRoute(gymId, wallId, routeId);
  }

  private async addItem(title: string, url: string, icon: string) {
    this.appPages.push({ title: title, url: url, icon: icon });
  }

  private async addGymsRoute() {
    this.addItem('Gyms', '/gyms', 'reorder-four');
  }

  async addGymRoute(gymId: string) {
    if (gymId != this.lastGym?.Id) {
      const gym = await this.gymService.getById(gymId);
      if (gym) {
        this.lastGym = gym;
      }
    }

    if (this.lastGym) {
      this.addItem(this.lastGym.Name, '/gyms/' + this.lastGym.Id + '/walls', 'reorder-four');
    }
  }

  async addWallRoute(gymId: string, wallId: string) {
    if (wallId != this.lastWall?.Id) {
      const wall = await this.wallService.getById(wallId);
      if (wall) {
        this.lastWall = wall;
      }
    }

    if (this.lastWall) {
      this.addItem(this.lastWall.Name, '/gyms/' + gymId + '/walls/' + this.lastWall.Id + '/routes', 'reorder-four');
    }
  }

  async addRouteRoute(gymId: string, wallId: string, routeId: string) {
    if (routeId != this.lastRoute?.Id) {
      const route = await this.routeService.getById(routeId);
      if (route) {
        this.lastRoute = route;
      }
    }

    if (this.lastRoute) {
      this.addItem(this.lastRoute.Name, '/gyms/' + gymId + '/walls/' + wallId + '/routes/' + routeId, 'reorder-four');
    }
  }
}

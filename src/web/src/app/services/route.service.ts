import { Injectable } from '@angular/core';
import { Route } from '../models/route';
import { environment } from 'src/environments/environment';

const ROUTES_REMOTE_URI: string = environment.api_base_uri + "boulders-5.json";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private routes?: Route[];

  public async getAll() : Promise<Route[]> {
    if (!this.routes) {
      const data = await fetch(ROUTES_REMOTE_URI);
      this.routes = await data.json();
    }

    return this.routes ?? [];
  }

  public async getById(id: string): Promise<Route | null> {
    if (!this.routes) {
      await this.getAll();
    }

    for (const r of this.routes ?? []) {
      if (r.Id === id) {
        return r;
      }
    }

    return null
  }
}

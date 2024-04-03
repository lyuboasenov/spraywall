import { Injectable } from '@angular/core';
import { Route } from '../models/route';

const ROUTES_REMOTE_URI: string = "https://storage.googleapis.com/spraywall/balkan/boulders-3.json";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private boulders?: Route[];

  public async getAll() : Promise<Route[]> {
    if (!this.boulders) {
      const data = await fetch(ROUTES_REMOTE_URI);
      this.boulders = await data.json();
    }

    return this.boulders ?? [];
  }
}

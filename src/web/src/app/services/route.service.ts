import { Injectable } from '@angular/core';
import { Route, RouteStyle, RouteType } from '../models/route';
import { Hold } from '../models/wall-template';
import { Databases, ID } from 'appwrite';
import { AppwriteService } from './appwrite.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private routes?: Route[];

  private _db: Databases;

  private _routeCollectionId = '66126500b72562898ef7';

  public routeDifficulty: Map<number, string> = new Map<number, string>();
  public boulderDifficulty: Map<number, string> = new Map<number, string>();
  public holdBuffer: Hold[] = [];

  constructor(private appwrite: AppwriteService, private auth: AuthService) {
    this.boulderDifficulty.set(20, "3");
    this.boulderDifficulty.set(25, "4-");
    this.boulderDifficulty.set(30, "4");
    this.boulderDifficulty.set(35, "4+");
    this.boulderDifficulty.set(40, "5-");
    this.boulderDifficulty.set(45, "5");
    this.boulderDifficulty.set(50, "5+");
    this.boulderDifficulty.set(55, "6A");
    this.boulderDifficulty.set(60, "6A+");
    this.boulderDifficulty.set(65, "6B");
    this.boulderDifficulty.set(70, "6B+");
    this.boulderDifficulty.set(75, "6C");
    this.boulderDifficulty.set(80, "6C+");
    this.boulderDifficulty.set(85, "7A");
    this.boulderDifficulty.set(90, "7A+");
    this.boulderDifficulty.set(95, "7B");
    this.boulderDifficulty.set(100, "7B+");
    this.boulderDifficulty.set(105, "7C");
    this.boulderDifficulty.set(110, "7C+");
    this.boulderDifficulty.set(115, "8A");
    this.boulderDifficulty.set(120, "8A+");
    this.boulderDifficulty.set(125, "8B");
    this.boulderDifficulty.set(130, "8B+");
    this.boulderDifficulty.set(135, "8C");
    this.boulderDifficulty.set(140, "8C+");
    this.boulderDifficulty.set(145, "9A");

    this.routeDifficulty.set(20, "5b+");
    this.routeDifficulty.set(25, "5c");
    this.routeDifficulty.set(30, "5c+");
    this.routeDifficulty.set(35, "6a");
    this.routeDifficulty.set(40, "6a+");
    this.routeDifficulty.set(45, "6b");
    this.routeDifficulty.set(50, "6b+");
    this.routeDifficulty.set(55, "6c");
    this.routeDifficulty.set(60, "6c+");
    this.routeDifficulty.set(65, "7a");
    this.routeDifficulty.set(70, "7a+");
    this.routeDifficulty.set(75, "7b");
    this.routeDifficulty.set(80, "7b+");
    this.routeDifficulty.set(85, "7c");
    this.routeDifficulty.set(90, "7c+");
    this.routeDifficulty.set(95, "8a");
    this.routeDifficulty.set(100, "8a+");
    this.routeDifficulty.set(105, "8b");
    this.routeDifficulty.set(110, "8b+");
    this.routeDifficulty.set(115, "8c");
    this.routeDifficulty.set(120, "8c+");
    this.routeDifficulty.set(125, "9a");
    this.routeDifficulty.set(130, "9a+");
    this.routeDifficulty.set(135, "9b");
    this.routeDifficulty.set(140, "9b+");
    this.routeDifficulty.set(145, "9c");

    this._db = new Databases(this.appwrite.client);
  }

  public async getAll(force: boolean = false) : Promise<Route[]> {
    if (!this.routes || force) {
      let routeArray: Route[] = [];
      const allRoutes = await this._db.listDocuments(this.appwrite.DatabaseId, this._routeCollectionId);

      for(let r of allRoutes.documents) {
        let holds: Hold[] = [];
        for (let h of r['Holds']) {
          holds.push({
            Type: h.Type,
            Center: h.Center,
            MinRect: {
              Center: h.Center,
              Size: '',
              Angle: 0
            },
            Contour: [],
            Radius: 0
          });
        }
        let difficulty = this.boulderDifficulty.get(r['Difficulty']);
        if (r['Type'] === RouteType.Route) {
          difficulty = this.routeDifficulty.get(r['Difficulty']);
        }

        routeArray.push(
          {
            Id: r.$id,
            Name: r['Name'],
            Description: r['Description'],
            Angle: r['Angle'],
            Difficulty: difficulty ?? 'unknown',
            Autor: r['CreatedByName'],
            Holds: holds,
            Style: r['Style'],
            Type: r['Type'],
            Rating: 5
          }
        );
      }

      this.routes = routeArray;
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

  public async create(type: RouteType, name: string, description: string, difficulty: number, angle: number, routeStyle: RouteStyle, holds: Hold[], interpolateAngles: number[] = []): Promise<string> {

    const user = await this.auth.getUser();

    let apiHolds = [];
    for (let h of holds) {
      apiHolds.push({
        Type: h.Type,
        Center: h.Center
      });
    }

    const route = await this._db.createDocument(
      this.appwrite.DatabaseId,
      this._routeCollectionId,
      ID.unique(),
      {
        Name: name,
        Description: description,
        Angle: angle,
        Difficulty: difficulty,
        CreatedById: user.$id,
        CreatedByName: user.name,
        Holds: apiHolds,
        Type: type,
        Style: routeStyle,
        FAById: user.$id,
        FAByName: user.name
      }
    );

    for(const interpolateAngle of interpolateAngles) {

      const angleDiff: number = interpolateAngle - angle;
      let interpolatedDifficulty: number = +difficulty+angleDiff;

      console.log(angleDiff);
      console.log(interpolatedDifficulty);

      if (angleDiff == 0) {
        continue;
      }

      interpolatedDifficulty = Math.min(interpolatedDifficulty, 145);
      interpolatedDifficulty = Math.max(interpolatedDifficulty, 0);

      console.log({
        Name: name,
        Description: description,
        Angle: interpolateAngle,
        Difficulty: interpolatedDifficulty,
        CreatedById: user.$id,
        CreatedByName: user.name,
        Holds: apiHolds,
        Type: type,
        Style: routeStyle,
        FAById: user.$id,
        FAByName: user.name
      });

      await this._db.createDocument(
        this.appwrite.DatabaseId,
        this._routeCollectionId,
        ID.unique(),
        {
          Name: name,
          Description: description,
          Angle: interpolateAngle,
          Difficulty: interpolatedDifficulty,
          CreatedById: user.$id,
          CreatedByName: user.name,
          Holds: apiHolds,
          Type: type,
          Style: routeStyle,
          FAById: user.$id,
          FAByName: user.name
        }
      );
    }

    return route.$id;
  }
}

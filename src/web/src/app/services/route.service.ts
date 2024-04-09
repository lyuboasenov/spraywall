import { Injectable } from '@angular/core';
import { LightRoute, Route, RouteFilter, RouteStyle, RouteType } from '../models/route';
import { Hold } from '../models/wall-template/wall-template';
import { Databases, ID, Query } from 'appwrite';
import { AppwriteService } from './appwrite.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private _db: Databases;
  private _routeCollectionId = '66126500b72562898ef7';

  public routeDifficulty: Map<number, string> = new Map<number, string>();
  public boulderDifficulty: Map<number, string> = new Map<number, string>();
  public holdBuffer: Hold[] = [];
  public filter: RouteFilter = {
    RouteType: undefined,
    RouteStyle: undefined,
    MinDifficulty: undefined,
    MaxDifficulty: undefined,
    Angle: undefined,
  };

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

  public async getAll() : Promise<LightRoute[]> {
    let routeArray: LightRoute[] = [];

    let query = [];
    query.push(
      Query.select(["$id", "Name", "Difficulty", "Angle", "Type"])
    );

    if (this.filter.Angle) {
      query.push(Query.equal("Angle", [this.filter.Angle]))
    }
    if (this.filter.RouteType) {
      query.push(Query.equal("RouteType", [this.filter.RouteType]))
    }
    if (this.filter.RouteStyle) {
      query.push(Query.equal("RouteStyle", [this.filter.RouteStyle]))
    }
    if (this.filter.MinDifficulty) {
      query.push(Query.greaterThanEqual("Difficulty", Number(this.filter.MinDifficulty)))
    }
    if (this.filter.MaxDifficulty) {
      query.push(Query.lessThanEqual("Difficulty", Number(this.filter.MaxDifficulty)))
    }

    const allRoutes = await this._db.listDocuments(
      this.appwrite.DatabaseId,
      this._routeCollectionId,
      query);

    for(let r of allRoutes.documents) {
      let difficulty = this.boulderDifficulty.get(r['Difficulty']);
      if (r['Type'] === RouteType.Route) {
        difficulty = this.routeDifficulty.get(r['Difficulty']);
      }

      routeArray.push(
        {
          Id: r.$id,
          Name: r['Name'],
          Angle: r['Angle'],
          Difficulty: difficulty ?? 'unknown',
          Type: r['Type'],
        }
      );
    }

    return routeArray;

  }

  public async getById(id: string): Promise<Route | null> {
    const route = await this._db.getDocument(
      this.appwrite.DatabaseId,
      this._routeCollectionId,
      id);

      let holds: Hold[] = [];
      for (let h of route['Holds']) {
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
      let difficulty = this.boulderDifficulty.get(route['Difficulty']);
      if (route['Type'] === RouteType.Route) {
        difficulty = this.routeDifficulty.get(route['Difficulty']);
      }

      return {
          Id: route.$id,
          Name: route['Name'],
          Description: route['Description'],
          Angle: route['Angle'],
          Difficulty: difficulty ?? 'unknown',
          Autor: route['CreatedByName'],
          Holds: holds,
          Style: route['Style'],
          Type: route['Type'],
          Rating: 5
        }
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
      let interpolatedDifficulty: number = Number(difficulty) + Number(angleDiff);

      if (angleDiff == 0) {
        continue;
      }

      interpolatedDifficulty = Math.min(interpolatedDifficulty, 145);
      interpolatedDifficulty = Math.max(interpolatedDifficulty, 0);

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

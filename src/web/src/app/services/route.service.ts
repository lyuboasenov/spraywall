import { Injectable } from '@angular/core';
import { Databases, ID, Query } from 'appwrite';
import { AppwriteService } from './appwrite.service';
import { AuthService } from './auth.service';
import { RouteFilter } from '../models/route/route-filter';
import { RouteSignature } from '../models/route/route-signature';
import { RouteType } from '../models/route/route-type';
import { Route } from '../models/route/route';
import { RouteStyle } from '../models/route/route-style';
import { RouteHold } from '../models/wall-template/route-hold';
import { Hold } from '../models/route/hold';
import { Send } from '../models/route/send';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private _db: Databases;
  private _routeCollectionId = environment.AppWrite.Collections.Routes;
  private _logCollectionId = environment.AppWrite.Collections.Logs;

  public routeDifficulty: Map<number, string> = new Map<number, string>();
  public boulderDifficulty: Map<number, string> = new Map<number, string>();
  public routeStyles: Map<RouteStyle, string> = new Map<RouteStyle, string>();
  public routeTypes: Map<RouteType, string> = new Map<RouteType, string>();
  public holdBuffer: RouteHold[] = [];
  public filter: RouteFilter = {
    RouteType: undefined,
    RouteStyle: undefined,
    MinDifficulty: undefined,
    MaxDifficulty: undefined,
    Angle: undefined,
  };
  public lastRouteType?: RouteType;
  public lastRouteStyle?: RouteStyle;
  public lastRouteDifficulty?: number;
  public lastRouteAngle?: number;

  constructor(private appwrite: AppwriteService, private auth: AuthService) {
    this.routeTypes.set(RouteType.Boulder, "Boulder");
    this.routeTypes.set(RouteType.Route, "Route");

    this.routeStyles.set(RouteStyle.FeetFollow, "Feet follow hands");
    this.routeStyles.set(RouteStyle.OpenFeet, "Open feet");
    this.routeStyles.set(RouteStyle.NoMatches, "No matching");
    this.routeStyles.set(RouteStyle.NoFeet, "No feet / Campusing");

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

  public async getAll(): Promise<RouteSignature[]> {
    let routeArray: RouteSignature[] = [];

    let query = [];
    query.push(
      Query.select(["$id", "Name", "Difficulty", "Angle", "Type"])
    );
    query.push(
      Query.limit(100000)
    );
    query.push(
      Query.orderAsc("Difficulty")
    );

    if (this.filter.Angle) {
      query.push(Query.equal("Angle", [this.filter.Angle]))
    }
    if (this.filter.RouteType) {
      query.push(Query.equal("Type", [this.filter.RouteType]))
    }
    if (this.filter.RouteStyle) {
      query.push(Query.equal("Style", [this.filter.RouteStyle]))
    }
    if (this.filter.MinDifficulty) {
      query.push(Query.greaterThanEqual("Difficulty", Number(this.filter.MinDifficulty)))
    }
    if (this.filter.MaxDifficulty) {
      query.push(Query.lessThanEqual("Difficulty", Number(this.filter.MaxDifficulty)))
    }
    if (this.filter.SetBy) {
      query.push(Query.search("CreatedByName", this.filter.SetBy))
    }

    const allRoutes = await this._db.listDocuments(
      this.appwrite.DatabaseId,
      this._routeCollectionId,
      query);

    for (let r of allRoutes.documents) {
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

    const sends = await this._db.listDocuments(
      this.appwrite.DatabaseId,
      this._logCollectionId,
      [
        Query.equal("Route", [route.$id]),
        Query.orderAsc("$createdAt")
      ]
    );

    let rating = 0;
    let ratingSum = 0;
    const sendArr: Send[] = []
    for (const send of sends.documents) {
      ratingSum += send['Rating'];
      let difficulty = route['Type'] == 0 ? this.boulderDifficulty.get(route['Difficulty']) : this.routeDifficulty.get(route['Difficulty']);
      if (!difficulty) {
         difficulty = 'unknown';
      }
      sendArr.push({
         Date: new Date(send.$createdAt).toDateString(),
         Difficulty: difficulty,
         Rating: send['Rating'],
         Comment: send['Comment'],
         User: send['CreatedByName']
      });
    }
    if (sends.total > 0) {
      rating = ratingSum / sends.total;
    }

    let holds: Hold[] = [];
    for (let h of JSON.parse(route['JsonHolds'])) {
      holds.push({
        Type: h[2],
        Center: {
          X: h[0][0],
          Y: h[0][1],
        },
      });
    }
    let difficulty = this.boulderDifficulty.get(route['Difficulty']);
    let settersdifficulty = this.boulderDifficulty.get(route['SettersDifficulty']);
    if (route['Type'] === RouteType.Route) {
      difficulty = this.routeDifficulty.get(route['Difficulty']);
      settersdifficulty = this.routeDifficulty.get(route['SettersDifficulty']);
    }

    return {
      Id: route.$id,
      Name: route['Name'],
      Description: route['Description'],
      Angle: route['Angle'],
      Difficulty: difficulty ?? 'unknown',
      DifficultyNumber: route['Difficulty'],
      SettersAngle: route['SettersAngle'],
      SettersDifficulty: settersdifficulty ?? 'unknown',
      Autor: route['CreatedByName'],
      Holds: holds,
      Style: this.routeStyles.get(route['Style']) ?? 'Unknown',
      Type: this.routeTypes.get(route['Type']) ?? 'Unknown',
      RouteType: route['Type'],
      Rating: rating,
      Sends: sendArr
    }
  }

  public async create(
    wallId: string,
    type: RouteType,
    name: string,
    description: string,
    difficulty: number,
    angle: number,
    routeStyle: RouteStyle,
    holds: RouteHold[],
    interpolateAngles: number[] = []): Promise<string> {

    const user = await this.auth.user.value;

    let apiHolds = [];
    for (let h of holds) {
      apiHolds.push([
        [
          h.TemplateHold.Center.X,
          h.TemplateHold.Center.Y
        ],
        h.TemplateHold.Radius,
        h.Type
      ]);
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
        CreatedById: user?.id,
        CreatedByName: user?.name,
        Type: type,
        Style: routeStyle,
        FAById: user?.id,
        FAByName: user?.name,
        JsonHolds: JSON.stringify(apiHolds),
        SettersAngle: angle,
        SettersDifficulty: difficulty,
        Wall: wallId
      }
    );

    for (const interpolateAngle of interpolateAngles) {

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
          CreatedById: user?.id,
          CreatedByName: user?.name,
          Type: type,
          Style: routeStyle,
          JsonHolds: JSON.stringify(apiHolds),
          SettersAngle: angle,
          SettersDifficulty: difficulty,
          ParentId: route.$id,
          Wall: wallId
        }
      );
    }

    this.lastRouteAngle = angle;
    this.lastRouteDifficulty = difficulty;
    this.lastRouteStyle = routeStyle;
    this.lastRouteType = type;

    return route.$id;
  }

  async logSend(routeId: string | undefined, comment: string | undefined, sendDifficulty: number | undefined, rating: number | undefined) {
    const user = await this.auth.user.value;
    await this._db.createDocument(
      this.appwrite.DatabaseId,
      this._logCollectionId,
      ID.unique(),
      {
        Route: routeId,
        Comment: comment,
        Rating: rating,
        Difficulty: sendDifficulty,
        CreatedById: user?.id,
        CreatedByName: user?.name,
      }
    );
  }
}

import { Hold } from "./wall-template/wall-template";

export enum RouteType {
  Boulder = <any>"Boulder",
  Route = <any>"Route"
}

export enum RouteStyle {
  FeetFollow = <any>"FeetFollow",
  OpenFeet = <any>"OpenFeet",
  NoMatches = <any>"NoMatches"
}

export interface RouteFilter {
  RouteType?: RouteType;
  RouteStyle?: RouteStyle;
  MinDifficulty?: number;
  MaxDifficulty?: number;
  Angle?: number;
}

export interface LightRoute {
  Id: string;
  Name: string;
  Angle: number;
  Difficulty: string;
  Type: RouteType;
}

export interface Route {
  Id: string;
  Name: string;
  Description: string;
  Angle: number;
  Rating: number;
  Difficulty: string;
  Autor: string;
  Holds: Hold[];
  Style: RouteStyle;
  Type: RouteType;
}

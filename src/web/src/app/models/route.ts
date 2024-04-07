import { Hold } from "./wall-template";

export enum RouteType {
  Boulder = <any>"Boulder",
  Route = <any>"Route"
}

export enum RouteStyle {
  FeetFollow = <any>"FeetFollow",
  OpenFeet = <any>"OpenFeet",
  NoMatches = <any>"NoMatches"
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

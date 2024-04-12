import { Hold } from "./hold";
import { RouteType } from "./route-type";

export interface Route {
  Id: string;
  Name: string;
  Description: string;
  Angle: number;
  Rating: number;
  Difficulty: string;
  DifficultyNumber: number;
  SettersAngle: number;
  SettersDifficulty: string;
  Autor: string;
  Holds: Hold[];
  Style: string;
  Type: string;
  RouteType: RouteType;
}

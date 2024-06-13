import { Hold } from "./hold";
import { RouteType } from "./route-type";
import { Send } from "./send";

export interface Route {
  Id: string;
  ParentId: string;
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
  Sends: Send[];
}

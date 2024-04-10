import { Hold } from "./hold";
import { RouteStyle } from "./route-style";
import { RouteType } from "./route-type";

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

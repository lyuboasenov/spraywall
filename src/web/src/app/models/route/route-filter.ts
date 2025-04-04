import { RouteStyle } from "./route-style";
import { RouteType } from "./route-type";

export interface RouteFilter {
  RouteType?: RouteType;
  RouteStyle?: RouteStyle;
  MinDifficulty?: number;
  MaxDifficulty?: number;
  Angle?: Number;
  SetBy?: string;
  ExcludeMyAscends?: boolean;
}

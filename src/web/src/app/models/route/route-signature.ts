import { RouteType } from "./route-type";

export interface RouteSignature {
  Id: string;
  Name: string;
  Angle: number;
  Difficulty: string;
  Type: RouteType;
}

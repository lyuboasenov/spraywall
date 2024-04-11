import { Hold } from "./hold";

export interface Route {
  Id: string;
  Name: string;
  Description: string;
  Angle: number;
  Rating: number;
  Difficulty: string;
  SettersAngle: number;
  SettersDifficulty: string;
  Autor: string;
  Holds: Hold[];
  Style: string;
  Type: string;
}

import { Hold } from "./wall-template";


export interface Route {
  Id: string;
  Name: string;
  Description: string;
  Angle: number;
  Rating: number;
  Difficulty: string;
  Autor: string;
  Holds: Hold[];
}

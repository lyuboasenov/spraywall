import { Point } from "../common/point";
import { HoldType } from "./hold-type";

export interface Hold {
  Center: Point;
  Type: HoldType;
}

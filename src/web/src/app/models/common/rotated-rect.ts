import { Point } from "./point";
import { Size } from "./size";

export interface RotatedRect {
  Center: Point;
  Size: Size;
  Angle: number;
}

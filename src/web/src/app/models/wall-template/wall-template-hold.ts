import { Point } from "../common/point";
import { RotatedRect } from "../common/rotated-rect";

export interface WallTemplateHold {
  MinRect: RotatedRect;
  Contour: Point[];
  Center: Point;
  Radius: number;
}

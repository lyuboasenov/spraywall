
export interface Size {
  Width: number;
  Height: number;
}

export interface Point {
  X: number;
  Y: number;
}

export interface RotatedRect {
  Center: Point;
  Size: any;
  Angle: number;
}

export enum HoldType {
  Hold = <any>"Hold",
  StartingHold = <any>"StartingHold",
  FinishingHold = <any>"FinishingHold",
  FootHold = <any>"FootHold"
}

export interface Hold {
  MinRect: RotatedRect;
  Contour: Point[];
  Center: Point;
  Radius: number;
  Type: HoldType;
}

export interface WallTemplate {
  EncodedImage: string;
  Holds: Hold[],
  Angles: number[]
}


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

export interface Hold {
  MinRect: RotatedRect;
  Contour: Point[];
  Center: Point;
  Radius: number;
}

export interface WallTemplate {
  EncodedImage: string;
  Holds: Hold[]
}

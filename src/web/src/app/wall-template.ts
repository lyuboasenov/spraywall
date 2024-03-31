
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

export interface WallTemplate {
  Elllipses: RotatedRect[];
  EncodedImage: string;
}

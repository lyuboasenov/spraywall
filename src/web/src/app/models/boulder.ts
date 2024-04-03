
export interface Point {
  X: number;
  Y: number;
}

export interface Boulder {
  Id: string;
  Name: string;
  Description: string;
  Angle: number;
  Rating: number;
  Difficulty: string;
  Autor: string;
  Holds: Point[];
}

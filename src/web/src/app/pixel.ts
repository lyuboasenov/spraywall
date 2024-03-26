export class Pixel {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public equals(obj: Pixel): boolean {
    return ((this.r == obj.r) && (this.g == obj.g) && (this.b == obj.b));
  }
}

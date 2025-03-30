import { WallTemplateHold } from "./wall-template-hold";

export interface WallTemplate {
  id: string,
  encodedImage: string;
  holds: WallTemplateHold[],
  angles: number[],
  image: HTMLImageElement,
  width?: number,
  height?: number,
  initialized: boolean
}

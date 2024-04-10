import { WallTemplateHold } from "./wall-template-hold";

export interface WallTemplate {
  EncodedImage: string;
  Holds: WallTemplateHold[],
  Angles: number[]
}

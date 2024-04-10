import { WallTemplateHold } from "./wall-template-hold";

export interface WallTemplate {
  Id: string,
  EncodedImage: string;
  Holds: WallTemplateHold[],
  Angles: number[]
}

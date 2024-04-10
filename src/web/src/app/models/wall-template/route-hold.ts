import { HoldType } from "../route/hold-type";
import { WallTemplateHold } from "./wall-template-hold";

export interface RouteHold {
  TemplateHold: WallTemplateHold;
  Type: HoldType;
}

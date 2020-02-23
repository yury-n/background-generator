import { RGBColor } from "react-color";

export enum FillType {
  Solid = "solid",
  Linear = "linear",
  Radial = "radial"
}

export type Color = {
  type: FillType;
  values: (string | RGBColor)[];
};

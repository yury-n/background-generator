import { FillType } from "./types";

export const colorObjToString = rgbObj => {
  return typeof rgbObj === "string"
    ? rgbObj
    : `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, ${rgbObj.a})`;
};

export const colorObjToCSSBackground = color => {
  if (color.type === FillType.Solid) {
    return colorObjToString(color.values[0]);
  } else if (color.type === FillType.Linear) {
    return `linear-gradient(to right, ${colorObjToString(
      color.values[0]
    )}, ${colorObjToString(color.values[1])})`;
  }
};

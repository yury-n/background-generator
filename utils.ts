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
    return `linear-gradient(to bottom, ${colorObjToString(
      color.values[0]
    )}, ${colorObjToString(color.values[1])})`;
  } else if (color.type === FillType.Radial) {
    return `radial-gradient(${colorObjToString(
      color.values[1]
    )}, ${colorObjToString(color.values[0])})`;
  }
};

export const angle2rect = (angle, sx, sy) => {
  while (angle < 0) angle += 360;
  angle %= 360;

  var a = sy,
    b = a + sx,
    c = b + sy,
    p = (sx + sy) * 2,
    rp = p / 360;
  var pp = Math.round((angle * rp + sy / 2) % p);

  if (pp <= a) return { x: 0, y: sy - pp };
  if (pp <= b) return { y: 0, x: pp - a };
  if (pp <= c) return { x: sx, y: pp - b };
  return { y: sy, x: sx - (pp - c) };
};

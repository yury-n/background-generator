export const colorObjToString = rgbObj => {
  return typeof rgbObj === "string"
    ? rgbObj
    : `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, ${rgbObj.a})`;
};

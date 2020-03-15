import layouts from "./layouts";

export const getDefaultConfigValues = layoutId => {
  const layout = layouts.find(layout => layout.id === layoutId);
  const configValues = {};
  layout.configFields.forEach(configField => {
    configValues[configField.name] = configField.defaultValue;
  });
  return configValues;
};

export const deg2rad = angle => {
  return angle * (Math.PI / 180);
};

export const rotateItemCoords = (item, origin, angle) => {
  const rads = deg2rad(angle);
  const coords: any = {};

  coords.left =
    Math.cos(rads) * (item.left - origin.left) -
    Math.sin(rads) * (item.top - origin.top) +
    origin.left;
  coords.top =
    Math.sin(rads) * (item.left - origin.left) +
    Math.cos(rads) * (item.top - origin.top) +
    origin.top;

  item.left = coords.left;
  item.top = coords.top;

  return item;
};

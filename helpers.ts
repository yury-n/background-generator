import layouts from "./layouts";

export const getDefaultConfigValues = layoutId => {
  const layout = layouts.find(layout => layout.id === layoutId);
  const configValues = {};
  layout.configFields.forEach(configField => {
    configValues[configField.name] = configField.defaultValue;
  });
  return configValues;
};

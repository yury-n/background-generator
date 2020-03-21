import { ConfigFieldType } from "../types";

export const beforeAll = [
  {
    isShared: true,
    name: "objectSize",
    label: "Object Size",
    type: ConfigFieldType.NumberInput,
    defaultValue: 10,
    minValue: 2,
    maxValue: 50
  }
];

export const beforeBooleans = [
  {
    isShared: true,
    name: "padding",
    label: "Padding %",
    type: ConfigFieldType.NumberInput,
    defaultValue: 10,
    minValue: 0,
    maxValue: 50
  }
];

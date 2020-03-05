import { ConfigFieldType } from "../types";

export default {
  id: 2,
  src: "/layout_thumbs/1.png",
  configFields: [
    {
      name: "objectSize",
      label: "Object Size",
      type: ConfigFieldType.NumberInput,
      defaultValue: 10,
      minValue: 2,
      maxValue: 50
    },
    {
      name: "columnCount",
      label: "Column Count",
      type: ConfigFieldType.NumberInput,
      defaultValue: 10,
      minValue: 1,
      maxValue: 50
    },
    {
      name: "rowCount",
      label: "Row Count",
      type: ConfigFieldType.NumberInput,
      defaultValue: 10,
      minValue: 1,
      maxValue: 50
    },
    {
      name: "padding",
      label: "Padding %",
      type: ConfigFieldType.NumberInput,
      defaultValue: 20,
      minValue: 0,
      maxValue: 50
    }
  ],
  generate: (width, height, configValues) => {
    const { columnCount, rowCount } = configValues;

    const px = width / columnCount;
    const py = height / rowCount;
    const items = [];
    for (let i = 0; i <= columnCount; i++) {
      for (let j = 0; j <= rowCount; j++) {
        const top = j * py;
        const left = i * px;
        items.push({ top, left });
      }
    }

    return items;
  }
};

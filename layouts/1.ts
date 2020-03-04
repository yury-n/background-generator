import random from "lodash.random";
import { ConfigFieldType } from "../types";

export default {
  id: 1,
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
      name: "objectDistance",
      label: "Object Distance",
      type: ConfigFieldType.NumberInput,
      defaultValue: 50,
      minValue: 0,
      maxValue: 100
    },
    {
      name: "padding",
      label: "Padding %",
      type: ConfigFieldType.NumberInput,
      defaultValue: 20,
      minValue: 0,
      maxValue: 50
    },
    {
      name: "withRandomPosition",
      label: "Randomize Position",
      type: ConfigFieldType.RandomnessInput,
      strengthConfigFieldName: "randomizePositionStrength"
    }
  ],
  generate: (width, height, configValues) => {
    const {
      withRandomPosition,
      randomizePositionStrength,
      objectDistance
    } = configValues;

    const objectCountX = Math.floor(width / objectDistance);
    const distanceX = objectDistance + (width % objectDistance) / objectCountX;

    const objectCountY = Math.floor(height / objectDistance);
    const distanceY = objectDistance + (height % objectDistance) / objectCountY;

    const randPower = withRandomPosition ? randomizePositionStrength / 10 : 0;

    const items = [];
    for (let i = 0; i <= width + distanceX / 2; i += distanceX) {
      for (let j = 0; j <= height + distanceY / 2; j += distanceY) {
        const left = Math.floor(
          i + (random(0, distanceX) - distanceX / 2) * randPower
        );
        const top = Math.floor(
          j + (random(0, distanceY) - distanceY / 2) * randPower
        );
        items.push({ top, left });
      }
    }
    return items;
  }
};

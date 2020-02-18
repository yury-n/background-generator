import random from "lodash.random";

export default {
  id: 1,
  generate: (width, height, configValues) => {
    const {
      withRandomPosition,
      randomizePositionStrength,
      itemCount
    } = configValues;

    const totalArea = width * height;
    const pointArea = totalArea / itemCount;
    const length = Math.sqrt(pointArea);

    const randPower = withRandomPosition ? randomizePositionStrength / 10 : 0;

    const items = [];
    for (let i = length / 2; i < width; i += length) {
      for (let j = length / 2; j < height; j += length) {
        const top = j + (random(0, length) - length / 2) * randPower;
        const left = i + (random(0, length) - length / 2) * randPower;
        items.push({ top, left });
      }
    }
    return items;
  }
};

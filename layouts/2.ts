import random from "lodash.random";

export default {
  id: 2,
  src: "/layout_thumbs/1.png",
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
  //   generate: (width, height, configValues) => {
  //     const {
  //       paddingX,
  //       paddingY,
  //       columnCount,
  //       rowCount,
  //       itemSize
  //     } = configValues;

  //     const px = (width - 2 * paddingX - itemSize) / columnCount;
  //     const py = (height - 2 * paddingY - itemSize) / rowCount;
  //     const items = [];
  //     for (let i = 0; i <= columnCount; i++) {
  //       for (let j = 0; j <= rowCount; j++) {
  //         const top = paddingY + j * py;
  //         const left = paddingX + i * px;
  //         items.push({ top: top, left: left, width: itemSize, height: itemSize });
  //       }
  //     }
  //     return items;
  //   }
};

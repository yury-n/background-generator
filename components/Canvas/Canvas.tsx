import React, { useEffect } from "react";
import random from "lodash.random";
import fabric from "fabric";

export interface Props {
  width: number;
  height: number;
  config: any;
}

export const Canvas: React.FC<Props> = ({
  width,
  height,
  config = { itemCount: 50 }
}) => {
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas();
    fabricCanvas.initialize(document.getElementById("canvas"), {
      height: 300,
      width: 300
    });
  }, []);
  const totalArea = width * height;
  const pointArea = totalArea / config.itemCount;
  const length = Math.sqrt(pointArea);

  const randPower = 0;

  const dots = [];
  for (let i = length / 2; i < width; i += length) {
    for (let j = length / 2; j < height; j += length) {
      const x = i + (random(0, length) - length / 2) * randPower;
      const y = j + (random(0, length) - length / 2) * randPower;
      dots.push(
        <Circle
          key={`${i}-${j}`}
          x={x}
          y={y}
          radius={2}
          fill="#000"
          draggable
        />
      );
    }
  }
  return <canvas id="canvas" />;
};
Canvas.displayName = "Canvas";

export default Canvas;

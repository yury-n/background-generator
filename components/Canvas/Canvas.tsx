import React, { useEffect } from "react";
import random from "lodash.random";
import "fabric";
declare let fabric: any;

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
    document.getElementById("canvas-container").innerHTML =
      '<canvas id="canvas"></canvas>';
    const fabricCanvas = new fabric.Canvas("canvas");
    fabricCanvas.setWidth(width);
    fabricCanvas.setHeight(height);
    fabricCanvas.add(
      new fabric.Rect({
        width,
        height,
        left: 0,
        top: 0,
        fill: "#fff",
        selectable: false,
        hoverCursor: "default"
      })
    );
    const totalArea = width * height;
    const pointArea = totalArea / config.itemCount;
    const length = Math.sqrt(pointArea);

    const randPower = 0;

    for (let i = length / 2; i < width; i += length) {
      for (let j = length / 2; j < height; j += length) {
        const x = i + (random(0, length) - length / 2) * randPower;
        const y = j + (random(0, length) - length / 2) * randPower;
        fabricCanvas &&
          fabricCanvas.add(
            new fabric.Circle({
              radius: 2,
              originX: "left",
              originY: "top",
              fill: "#000",
              top: y,
              left: x
            })
          );
      }
    }
    fabricCanvas && fabricCanvas.renderAll();
  }, [width, height]);
  return <div id="canvas-container" />;
};
Canvas.displayName = "Canvas";

export default Canvas;

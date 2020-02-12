import React, { useEffect } from "react";
import Head from "next/head";
import random from "lodash.random";
import throttle from "lodash.throttle";
import { colorObjToString } from "../../utils";

export interface Props {
  width: number;
  height: number;
  configValues: any;
  configColors: any;
}

export const Canvas: React.FC<Props> = ({
  width,
  height,
  configValues,
  configColors
}) => {
  useEffect(() => {
    redrawCanvas({ width, height, configColors, configValues, redrawCanvas });
  }, [width, height, configColors, configValues, redrawCanvas]);

  return (
    <>
      <Head>
        <script src="https://unpkg.com/fabric@3.6.2/dist/fabric.min.js" />
      </Head>
      <div id="canvas-container" />
    </>
  );
};
Canvas.displayName = "Canvas";

const redrawCanvas = throttle(
  ({ width, height, configColors, configValues }) => {
    if (!window["fabric"]) {
      return;
    }
    document.getElementById("canvas-container").innerHTML =
      '<canvas id="canvas"></canvas>';
    const fabricCanvas = new window["fabric"].Canvas("canvas");
    window["fabricCanvas"] = fabricCanvas;
    fabricCanvas.setWidth(width);
    fabricCanvas.setHeight(height);
    fabricCanvas.add(
      new window["fabric"].Rect({
        width,
        height,
        left: 0,
        top: 0,
        fill: colorObjToString(configColors.backgroundColor),
        selectable: false,
        hoverCursor: "default"
      })
    );
    const totalArea = width * height;
    const pointArea = totalArea / configValues.itemCount;
    const length = Math.sqrt(pointArea);

    const randPower = configValues.withRandomness
      ? configValues.randomnessStrength / 10
      : 0;

    for (let i = length / 2; i < width; i += length) {
      for (let j = length / 2; j < height; j += length) {
        const x = i + (random(0, length) - length / 2) * randPower;
        const y = j + (random(0, length) - length / 2) * randPower;
        fabricCanvas &&
          fabricCanvas.add(
            new window["fabric"].Circle({
              radius: configValues.itemSize,
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
  },
  100
);

export default Canvas;

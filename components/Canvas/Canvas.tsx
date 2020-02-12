import React, { useEffect, useRef } from "react";
import Head from "next/head";
import random from "lodash.random";
import throttle from "lodash.throttle";
import { colorObjToString } from "../../utils";

import s from "./Canvas.less";

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
  const canvasContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    redrawCanvas({
      width,
      height,
      configColors,
      configValues,
      canvasContainer,
      redrawCanvas
    });
  }, [
    width,
    height,
    configColors,
    configValues,
    canvasContainer,
    redrawCanvas
  ]);

  return (
    <>
      <Head>
        <script src="https://unpkg.com/fabric@3.6.2/dist/fabric.min.js" />
      </Head>
      <div
        id="canvas-container"
        className={s["canvas-container"]}
        ref={canvasContainer}
      />
    </>
  );
};
Canvas.displayName = "Canvas";

const redrawCanvas = throttle(
  ({ width, height, configColors, configValues, canvasContainer }) => {
    if (!window["fabric"] || !canvasContainer.current) {
      return;
    }

    const containerRect = canvasContainer.current.getBoundingClientRect();

    const scaleToFit = getScaleToFullyFit({
      width,
      height,
      maxWidth: containerRect.width - 70 * 2,
      maxHeight: containerRect.height - 70 * 2
    });

    document.getElementById(
      "canvas-container"
    ).innerHTML = `<canvas id="canvas" style="transform: scale(${scaleToFit})"></canvas>`;

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

const getScaleToFullyFit = ({ width, height, maxWidth, maxHeight }) => {
  console.log({ width, height, maxWidth, maxHeight });
  let scaleToFitWidth = 1;
  let scaleToFitHeight = 1;
  if (width && width > maxWidth) {
    scaleToFitWidth = maxWidth / width;
  }
  if (height && height > maxHeight) {
    scaleToFitHeight = maxHeight / height;
  }
  const scaleToFullyFit = Math.min(scaleToFitWidth, scaleToFitHeight);
  return scaleToFullyFit;
};

export default Canvas;

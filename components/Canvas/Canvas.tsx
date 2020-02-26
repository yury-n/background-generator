import React, { useEffect, useRef } from "react";
import Head from "next/head";
import throttle from "lodash.throttle";
import { colorObjToString, angle2rect } from "../../utils";
import layouts from "../../layouts";

import s from "./Canvas.less";
import { FillType } from "../../types";

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

const applyColorToFabricElement = (color, elem) => {
  const { width, height } = elem;
  if (color.type === FillType.Solid) {
    elem.set({
      fill: colorObjToString(color.values[0])
    });
  } else if (color.type === FillType.Linear) {
    const gradientStart = angle2rect(color.angle, width, height);
    const gradientEnd = {
      x: width - gradientStart.x,
      y: height - gradientStart.y
    };
    elem.setGradient("fill", {
      x1: gradientStart.x,
      y1: gradientStart.y,
      x2: gradientEnd.x,
      y2: gradientEnd.y,
      colorStops: {
        0: colorObjToString(color.values[0]),
        1: colorObjToString(color.values[1])
      }
    });
  } else if (color.type === FillType.Radial) {
    elem.setGradient("fill", {
      x1: width / 2,
      y1: height / 2,
      x2: width / 2,
      y2: height / 2,
      type: "radial",
      r1: width / 2,
      r2: 10,
      colorStops: {
        0: colorObjToString(color.values[0]),
        1: colorObjToString(color.values[1])
      }
    });
  }
};

const redrawCanvas = throttle(
  ({ width, height, configColors, configValues, canvasContainer }) => {
    if (!window["fabric"] || !canvasContainer.current) {
      return;
    }

    const layout = layouts.find(l => l.id === 1);

    const containerRect = canvasContainer.current.getBoundingClientRect();

    const scaleToFit = getScaleToFullyFit({
      width,
      height,
      maxWidth: containerRect.width - 70 * 2,
      maxHeight: containerRect.height - 70 * 2
    });

    canvasContainer.current.innerHTML = `<div id="canvas-scale-wrapper"><canvas id="canvas"></canvas></div>`;
    canvasContainer.current.firstChild.style.transform = `scale(${scaleToFit})`;

    const fabricCanvas = new window["fabric"].Canvas("canvas");
    window["fabricCanvas"] = fabricCanvas;
    fabricCanvas.setWidth(width);
    fabricCanvas.setHeight(height);
    const rect = new window["fabric"].Rect({
      width,
      height,
      left: 0,
      top: 0,
      selectable: false,
      hoverCursor: "default"
    });
    applyColorToFabricElement(configColors.backgroundColor, rect);

    window["rect"] = rect;
    fabricCanvas.add(rect);

    const items = layout.generate(width, height, configValues);

    window["fabric"].loadSVGFromURL(
      window["loadedFile"] ? window["loadedFile"].imageUrl : "/svgs/1.svg",
      function(objects, options) {
        objects[0].fill.colorStops[1].color = "rgb(255,255,255)";
        var obj = window["fabric"].util.groupSVGElements(objects, options);
        items.forEach(item =>
          obj.clone(
            (function(top, left) {
              return function(clone) {
                clone.scaleToWidth(50);
                clone.set({
                  left: left - 25,
                  top: top - 25
                });
                applyColorToFabricElement(configColors.itemColors[0], clone);
                fabricCanvas && fabricCanvas.add(clone);
              };
            })(item.top, item.left)
          )
        );
        fabricCanvas && fabricCanvas.renderAll();
      }
    );
  },
  100
);

const getScaleToFullyFit = ({ width, height, maxWidth, maxHeight }) => {
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

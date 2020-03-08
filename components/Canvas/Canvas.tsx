import React, { useEffect, useRef } from "react";
import Head from "next/head";
import throttle from "lodash.throttle";
import random from "lodash.random";
import { colorObjToString, angle2rect } from "../../utils";
import layouts from "../../layouts";
import objects from "../../objects";
import { FillType, ImageObject } from "../../types";

import s from "./Canvas.less";

export interface Props {
  width: number;
  height: number;
  configValues: any;
  configColors: any;
  selectedObjectIds: number[];
  selectedLayoutId: number;
  uploadedObjects: ImageObject[];
}

export const Canvas: React.FC<Props> = ({
  width,
  height,
  configValues,
  configColors,
  selectedObjectIds,
  selectedLayoutId,
  uploadedObjects
}) => {
  const canvasContainer = useRef<HTMLDivElement>();

  useEffect(() => {
    redrawCanvas({
      width,
      height,
      configColors,
      configValues,
      selectedObjectIds,
      selectedLayoutId,
      uploadedObjects,
      canvasContainer,
      redrawCanvas
    });
  }, [
    width,
    height,
    configColors,
    configValues,
    selectedObjectIds,
    selectedLayoutId,
    uploadedObjects,
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

let prevConfigValues;
const loadedFabricObjects = {};
let loadedFabricObjectsCount = 0;

const redrawCanvas = throttle(
  ({
    width,
    height,
    configColors,
    configValues,
    selectedObjectIds,
    selectedLayoutId,
    uploadedObjects,
    canvasContainer
  }) => {
    if (!window || !window["fabric"] || !canvasContainer.current) {
      return null;
    }

    console.log({ uploadedObjects, selectedObjectIds });
    const selectedObjects = selectedObjectIds.map(id =>
      [...uploadedObjects, ...objects].find(item => item.id === id)
    );

    const renderLayoutItems = () => {
      const paddingX = width * (configValues.padding / 100);
      const paddingY = height * (configValues.padding / 100);

      const layout = layouts.find(l => l.id === selectedLayoutId);
      const layoutItems = layout.generate(
        width - 2 * paddingX,
        height - 2 * paddingY,
        configValues
      );

      let currentColorIndex = 0;
      let currentObjectIndex = 0;
      layoutItems.forEach(item =>
        loadedFabricObjects[selectedObjects[currentObjectIndex].id].clone(
          (function(top, left) {
            return function(clone) {
              window["objects"].push(clone);
              clone.scaleToWidth(configValues.objectSize);
              clone.set({
                left: paddingX + left - configValues.objectSize / 2,
                top: paddingY + top - configValues.objectSize / 2
              });
              applyColorToFabricElement(
                configColors.objectColors[currentColorIndex],
                clone
              );
              window["fabricCanvas"] && window["fabricCanvas"].add(clone);

              if (selectedObjects.length > 0) {
                if (configValues.withRandomObjectOrder) {
                  currentObjectIndex = random(0, selectedObjects.length - 1);
                } else {
                  currentObjectIndex++;
                  if (currentObjectIndex > selectedObjects.length - 1) {
                    currentObjectIndex = 0;
                  }
                }
              }

              if (configColors.objectColors.length > 0) {
                if (configValues.withRandomColor) {
                  currentColorIndex = random(
                    0,
                    configColors.objectColors.length - 1
                  );
                } else {
                  currentColorIndex++;
                  if (
                    currentColorIndex >
                    configColors.objectColors.length - 1
                  ) {
                    currentColorIndex = 0;
                  }
                }
              }
            };
          })(item.top, item.left)
        )
      );
      window["fabricCanvas"] && window["fabricCanvas"].renderAll();
    };

    if (
      prevConfigValues &&
      configValues.objectSize !== prevConfigValues.objectSize
    ) {
      window["objects"].forEach(object => {
        object.scaleToWidth(configValues.objectSize);
        const objectSizeDelta =
          configValues.objectSize - prevConfigValues.objectSize;
        object.set({
          left: object.left - objectSizeDelta / 2,
          top: object.top - objectSizeDelta / 2
        });
      });
      window["fabricCanvas"].renderAll();
      prevConfigValues = configValues;
      return;
    }

    if (
      prevConfigValues &&
      configValues.objectDistance !== prevConfigValues.objectDistance
    ) {
      window["objects"].forEach(object => {
        window["fabricCanvas"].remove(object);
      });
      window["objects"] = [];
      renderLayoutItems();
      prevConfigValues = configValues;
      return;
    }

    prevConfigValues = configValues;

    console.log({ selectedObjects });
    loadedFabricObjectsCount = 0;
    selectedObjects.map(selectedObject => {
      window["fabric"].loadSVGFromURL(selectedObject.src, function(
        objects,
        options
      ) {
        const obj = window["fabric"].util.groupSVGElements(objects, options);
        loadedFabricObjects[selectedObject.id] = obj;
        loadedFabricObjectsCount++;
        if (loadedFabricObjectsCount === selectedObjects.length) {
          renderLayoutItems();
        }
      });
    });
    // window["loadedFile"] ? window["loadedFile"].imageUrl

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
    window["objects"] = [];
    fabricCanvas.add(rect);
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

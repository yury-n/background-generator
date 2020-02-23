import { createAction } from "redux-actions";
import { Color } from "./types";

export const refreshRandomSnapshot = createAction("REFRESH_RANDOM_SNAPSHOT");

export const setCanvasDimensions = createAction<{
  width: number;
  height: number;
}>("SET_CANVAS_DIMENSIONS");

export const setBackgroundColor = createAction<Color>("SET_BACKGROUND_COLOR");

export const setConfigValue = createAction<{
  configKey: string;
  configValue: any;
}>("SET_CONFIG_VALUE");

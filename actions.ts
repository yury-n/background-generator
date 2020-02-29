import { createAction } from "redux-actions";
import { Color } from "./types";

export const refreshRandomSnapshot = createAction("REFRESH_RANDOM_SNAPSHOT");

export const setCanvasDimensions = createAction<{
  width: number;
  height: number;
}>("SET_CANVAS_DIMENSIONS");

export const setBackgroundColor = createAction<Color>("SET_BACKGROUND_COLOR");
export const setItemColor = createAction<{ index: number; color: Color }>(
  "SET_ITEM_COLOR"
);

export const addItemColor = createAction("ADD_ITEM_COLOR");
export const removeItemColor = createAction<{ index: number }>(
  "REMOVE_BACKGROUND_COLOR"
);

export const selectItem = createAction<{ id: number }>("SELECT_ITEM");
export const deselectItem = createAction<{ id: number }>("DESELECT_ITEM");

export const setConfigValue = createAction<{
  configKey: string;
  configValue: any;
}>("SET_CONFIG_VALUE");

import { createAction } from "redux-actions";

export const setCanvasDimensions = createAction<{
  width: number;
  height: number;
}>("SET_CANVAS_DIMENSIONS");

export const setBackgroundColor = createAction<{
  color: string;
}>("SET_BACKGROUND_COLOR");

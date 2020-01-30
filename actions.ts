import { createAction } from "redux-actions";

export const setCanvasDimensions = createAction<{
  width: number;
  height: number;
}>("SET_CANVAS_DIMENSIONS");

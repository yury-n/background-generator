import { handleActions } from "redux-actions";
import { AppState } from "./types/store";
import { setCanvasDimensions } from "./actions";

export const initState = {
  canvasWidth: 800,
  canvasHeight: 600
};

const reducer = handleActions<AppState, any>(
  {
    [setCanvasDimensions.toString()]: (
      state,
      action: ReturnType<typeof setCanvasDimensions>
    ) => ({
      ...state,
      canvasWidth: action.payload.width,
      canvasHeight: action.payload.height
    })
  },
  initState
);

export default reducer;

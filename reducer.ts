import { handleActions } from "redux-actions";
import { AppState } from "./types/store";
import { setCanvasDimensions, setBackgroundColor } from "./actions";

export const initState: AppState = {
  canvasWidth: 800,
  canvasHeight: 600,
  configColors: {
    backgroundColor: "#fff",
    itemColor: "#000"
  }
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
    }),
    [setBackgroundColor.toString()]: (
      state,
      action: ReturnType<typeof setBackgroundColor>
    ) => ({
      ...state,
      configColors: {
        ...state.configColors,
        backgroundColor: action.payload.color
      }
    })
  },
  initState
);

export default reducer;

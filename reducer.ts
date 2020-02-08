import { handleActions } from "redux-actions";
import { AppState } from "./types/store";
import {
  setCanvasDimensions,
  setBackgroundColor,
  setConfigValue,
  refreshRandomSnapshot
} from "./actions";

export const initState: AppState = {
  canvasWidth: 800,
  canvasHeight: 600,
  configColors: {
    backgroundColor: "#fff",
    itemColor: "#000"
  },
  configValues: {
    itemCount: 50,
    itemSize: 2,
    padding: 10,
    withRandomness: false,
    randomnessStrength: 10
  },
  currentRandomSnapshot: Math.random()
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
    }),
    [setConfigValue.toString()]: (
      state,
      action: ReturnType<typeof setConfigValue>
    ) => ({
      ...state,
      configValues: {
        ...state.configValues,
        [action.payload.configKey]: action.payload.configValue
      }
    }),
    [refreshRandomSnapshot.toString()]: (
      state,
      action: ReturnType<typeof refreshRandomSnapshot>
    ) => ({
      ...state,
      configValues: {
        ...state.configValues,
        currentRandomSnapshot: Math.random()
      }
    })
  },
  initState
);

export default reducer;

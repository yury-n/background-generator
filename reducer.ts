import { handleActions } from "redux-actions";
import { AppState } from "./types/store";
import {
  setCanvasDimensions,
  setBackgroundColor,
  setConfigValue,
  refreshRandomSnapshot,
  setItemColor,
  addItemColor,
  removeItemColor,
  selectObject,
  deselectObject,
  selectLayout
} from "./actions";
import { FillType } from "./types";

export const initState: AppState = {
  canvasWidth: 1080,
  canvasHeight: 1080,
  configColors: {
    backgroundColor: { type: FillType.Solid, values: ["#fff", "#ccc"] },
    objectColors: [{ type: FillType.Solid, values: ["#000", "#ccc"] }]
  },
  configValues: {
    objectDistance: 50,
    objectSize: 2,
    padding: 10,
    withRandomPosition: false,
    randomizePositionStrength: 10
  },
  selectedLayoutId: 1,
  selectedObjectIds: [3],
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
        backgroundColor: {
          ...state.configColors["backgroundColor"],
          ...action.payload
        }
      }
    }),
    [setItemColor.toString()]: (
      state,
      action: ReturnType<typeof setItemColor>
    ) => {
      const newObjectColors = [...state.configColors.objectColors];

      newObjectColors[action.payload.index] = action.payload.color;

      return {
        ...state,
        configColors: {
          ...state.configColors,
          objectColors: newObjectColors
        }
      };
    },
    [addItemColor.toString()]: state => {
      const { objectColors } = state.configColors;
      const newObjectColors = [
        ...objectColors,
        objectColors[objectColors.length - 1]
      ];

      return {
        ...state,
        configColors: {
          ...state.configColors,
          objectColors: newObjectColors
        }
      };
    },
    [removeItemColor.toString()]: (
      state,
      action: ReturnType<typeof removeItemColor>
    ) => {
      const newObjectColors = [...state.configColors.objectColors];
      newObjectColors.splice(action.payload.index, 1);
      return {
        ...state,
        configColors: {
          ...state.configColors,
          objectColors: newObjectColors
        }
      };
    },
    [setConfigValue.toString()]: (
      state,
      action: ReturnType<typeof setConfigValue>
    ) => ({
      ...state,
      configValues: {
        ...state.configValues,
        [action.payload.configFieldName]: action.payload.configValue
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
    }),
    [selectObject.toString()]: (
      state,
      action: ReturnType<typeof selectObject>
    ) => {
      return {
        ...state,
        selectedObjectIds: [...state.selectedObjectIds, action.payload.id]
      };
    },
    [deselectObject.toString()]: (
      state,
      action: ReturnType<typeof deselectObject>
    ) => {
      return {
        ...state,
        selectedObjectIds: state.selectedObjectIds.filter(
          id => id !== action.payload.id
        )
      };
    },
    [selectLayout.toString()]: (
      state,
      action: ReturnType<typeof selectLayout>
    ) => {
      return {
        ...state,
        selectedLayoutId: action.payload.id
      };
    }
  },
  initState
);

export default reducer;

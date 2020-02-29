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
  selectItem,
  deselectItem
} from "./actions";
import { FillType } from "./types";

export const initState: AppState = {
  canvasWidth: 1080,
  canvasHeight: 1080,
  configColors: {
    backgroundColor: { type: FillType.Solid, values: ["#fff", "#ccc"] },
    itemColors: [{ type: FillType.Solid, values: ["#000", "#ccc"] }]
  },
  configValues: {
    itemCount: 50,
    itemSize: 2,
    padding: 10,
    withRandomPosition: false,
    randomizePositionStrength: 10
  },
  selectedLayout: 0,
  selectedItems: [3],
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
      const newItemColors = [...state.configColors.itemColors];

      newItemColors[action.payload.index] = action.payload.color;

      return {
        ...state,
        configColors: {
          ...state.configColors,
          itemColors: newItemColors
        }
      };
    },
    [addItemColor.toString()]: state => {
      const { itemColors } = state.configColors;
      const newItemColors = [...itemColors, itemColors[itemColors.length - 1]];

      return {
        ...state,
        configColors: {
          ...state.configColors,
          itemColors: newItemColors
        }
      };
    },
    [removeItemColor.toString()]: (
      state,
      action: ReturnType<typeof removeItemColor>
    ) => {
      const newItemColors = [...state.configColors.itemColors];
      newItemColors.splice(action.payload.index, 1);
      return {
        ...state,
        configColors: {
          ...state.configColors,
          itemColors: newItemColors
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
    }),
    [selectItem.toString()]: (state, action: ReturnType<typeof selectItem>) => {
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload.id]
      };
    },
    [deselectItem.toString()]: (
      state,
      action: ReturnType<typeof deselectItem>
    ) => {
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          itemId => itemId !== action.payload.id
        )
      };
    }
  },
  initState
);

export default reducer;

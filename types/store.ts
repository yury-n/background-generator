import { Color } from "../types";

export interface AppState {
  canvasWidth: number;
  canvasHeight: number;
  configColors: {
    backgroundColor: Color;
    itemColors: Color[];
  };
  configValues: any;
  currentRandomSnapshot: number;
}

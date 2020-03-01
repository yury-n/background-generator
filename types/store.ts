import { Color } from "../types";

export interface AppState {
  canvasWidth: number;
  canvasHeight: number;
  configColors: {
    backgroundColor: Color;
    objectColors: Color[];
  };
  configValues: any;
  currentRandomSnapshot: number;
  selectedLayoutId: number;
  selectedObjectIds: number[];
}

import { FillType } from "../types";

export interface AppState {
  canvasWidth: number;
  canvasHeight: number;
  configColors: {
    backgroundColor: { type: FillType; value: string };
    itemColor: string;
  };
  configValues: any;
  currentRandomSnapshot: number;
}

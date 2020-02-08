export interface AppState {
  canvasWidth: number;
  canvasHeight: number;
  configColors: {
    backgroundColor: string;
    itemColor: string;
  };
  configValues: any;
  currentRandomSnapshot: number;
}

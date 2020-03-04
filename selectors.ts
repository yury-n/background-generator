import { AppState } from "./types/store";
import layouts from "./layouts";

export const getConfigValue = configField => (state: AppState) =>
  state.configValues[configField];

export const getConfigField = configFieldName => (state: AppState) =>
  getSelectedLayout(state).configFields.find(
    configField => configField.name === configFieldName
  );

export const getSelectedLayout = (state: AppState) =>
  layouts.find(layout => layout.id === state.selectedLayoutId);

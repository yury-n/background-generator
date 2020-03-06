import { AppState } from "./types/store";
import layouts from "./layouts";

export const getConfigValue = configField => (state: AppState) =>
  state.configValues[configField];

export const getConfigFields = (state: AppState) =>
  getSelectedLayout(state).configFields || [];

export const getConfigField = configFieldName => (state: AppState) =>
  getConfigFields(state).find(
    configField => configField.name === configFieldName
  );

export const getSelectedLayout = (state: AppState) =>
  layouts.find(layout => layout.id === state.selectedLayoutId);

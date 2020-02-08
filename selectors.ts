import { AppState } from "./types/store";

export const getConfigValue = configKey => (state: AppState) =>
  state.configValues[configKey];

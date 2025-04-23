import { NavigateFunction } from "react-router-dom";

let navigator: NavigateFunction | null = null;

export const setNavigator = (navigateFunction: NavigateFunction) => {
  navigator = navigateFunction;
};

export const navigateTo = (path: string) => {
  if (navigator) {
    navigator(path);
  } else {
    console.warn("Navigator is not initialized");
  }
};
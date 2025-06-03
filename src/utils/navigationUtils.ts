import { NavigateFunction } from "react-router-dom";

let navigator: NavigateFunction | null = null;

export const setNavigator = (navigateFunction: NavigateFunction) => {
  navigator = navigateFunction;
  // navigator is a module-scoped variable that will store the actual navigate function.
  // setNavigator(navigate) assigns the React Router's useNavigate() to that variable.
  // navigateTo(path) is your custom function that triggers navigation from anywhere in your codebase
};

export const navigateTo = (path: string) => {
  if (navigator) {
    navigator(path);
  } else {
    console.warn("Navigator is not initialized");
  }
};
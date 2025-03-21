import { createContext, FC, useContext, useEffect, useState } from "react";

import {
  ThemeContextType,
  ThemeProviderType,
  ThemeMode,
} from "./ThemeContext.types";
import { AppDarkTheme, AppLightTheme } from "../../styles/theme";
import { Theme, ThemeProvider, useMediaQuery } from "@mui/material";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviders: FC<ThemeProviderType> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.DARK);

  const [theme, setTheme] = useState<Theme>(AppLightTheme);

  const SYSTEM_THEME = useMediaQuery("(prefers-color-scheme: dark)")
    ? ThemeMode.DARK
    : ThemeMode.LIGHT;

  useEffect(() => {
    switch (themeMode) {
      case ThemeMode.LIGHT:
        setTheme(AppLightTheme);
        break;
      case ThemeMode.DARK:
        setTheme(AppDarkTheme);
        break;
      case ThemeMode.SYSTEM:
        switch (SYSTEM_THEME) {
          case ThemeMode.LIGHT:
            setTheme(AppLightTheme);
            break;
          case ThemeMode.DARK:
            setTheme(AppDarkTheme);
            break;
        }
        break;
      default:
        setTheme(AppLightTheme);
        break;
    }
  }, [themeMode, SYSTEM_THEME]);

  const switchThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const contextValue = {
    themeMode,
    switchThemeMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Use themecontext within theme context provider");
  }

  return context;
};

import { ReactNode } from "react";

// Literal Types are shown below
// export type theme = 'dark' | 'light';

export type ThemeContextType = {
    themeMode: ThemeMode;
    switchThemeMode: (mode:ThemeMode) => void;
};

export type ThemeProviderType = {
    children:ReactNode
}

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = 'system'
}
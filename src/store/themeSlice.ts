import { StateCreator } from "zustand";

export interface ThemeSlice {
  isLightTheme: boolean;
  setLightTheme: (value: boolean) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set, get) => ({
  isLightTheme: true,
  setLightTheme: (value: boolean) => {
    set(() => ({
      isLightTheme: value,
    }));
  },
});

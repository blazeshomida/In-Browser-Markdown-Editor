import { stat } from "fs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Panels = "left" | "right" | "none";

type AppStore = {
  menuOpen: boolean;
  toggleMenu: (defaultState?: boolean) => void;
  resizing: boolean;
  setResizing: (resizing: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  activePanel: Panels;
  setActivePanel: (panel: Panels) => void;
  currentLocale: string;
  setCurrentLocale: (locale: string) => void;
};

const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      menuOpen: false,
      toggleMenu: (defaultState) =>
        set((state) => ({ menuOpen: defaultState || !state.menuOpen })),
      resizing: false,
      setResizing: (resizing) => set({ resizing }),
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      activePanel: "none",
      setActivePanel: (activePanel: Panels) => set({ activePanel }),
      currentLocale: "en-US", // set a default locale
      setCurrentLocale: (locale) => set({ currentLocale: locale }),
    }),
    {
      name: "app-storage",
      partialize: (state) =>
        ({
          darkMode: state.darkMode,
          currentLocale: state.currentLocale,
        }) as AppStore,
    },
  ),
);

export const useMenuOpen = () => useAppStore((state) => state.menuOpen);
export const useToggleMenu = () => useAppStore((state) => state.toggleMenu);
export const useResizing = () => useAppStore((state) => state.resizing);
export const useSetResizing = () => useAppStore((state) => state.setResizing);
export const useDarkMode = () => useAppStore((state) => state.darkMode);
export const useToggleDarkMode = () =>
  useAppStore((state) => state.toggleDarkMode);
export const useActivePanel = () => useAppStore((state) => state.activePanel);
export const useSetActivePanel = () =>
  useAppStore((state) => state.setActivePanel);
export const useCurrentLocale = () =>
  useAppStore((state) => state.currentLocale);
export const useSetCurrentLocale = () =>
  useAppStore((state) => state.setCurrentLocale);

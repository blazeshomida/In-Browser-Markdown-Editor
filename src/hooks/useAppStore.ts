import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppStore = {
  menuOpen: boolean;
  toggleMenu: (defaultState?: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      menuOpen: false,
      toggleMenu: (defaultState) =>
        set((state) => ({ menuOpen: defaultState || !state.menuOpen })),
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "app-storage",
      partialize: (state) =>
        ({
          darkMode: state.darkMode,
        }) as AppStore,
    },
  ),
);

export const useMenuOpen = () => useAppStore((state) => state.menuOpen);
export const useToggleMenu = () => useAppStore((state) => state.toggleMenu);
export const useDarkMode = () => useAppStore((state) => state.darkMode);
export const useToggleDarkMode = () =>
  useAppStore((state) => state.toggleDarkMode);

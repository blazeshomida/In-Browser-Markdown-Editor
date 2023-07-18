import { create } from "zustand";
import { useCallback } from "react";

type AppStore = {
  menuOpen: boolean;
  toggleMenu: (isMenuOpen?: boolean) => void;
  resizing: boolean;
  startResizing: () => void;
  stopResizing: () => void;
};

const useAppStore = create<AppStore>((set) => ({
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  resizing: false,
  startResizing: () => set({ resizing: true }),
  stopResizing: () => set({ resizing: false }),
}));

export const useMenuOpen = () => useAppStore((state) => state.menuOpen);
export const useToggleMenu = () => useAppStore((state) => state.toggleMenu);
export const useResizing = () => useAppStore((state) => state.resizing);
export const useStartResizing = () =>
  useAppStore((state) => state.startResizing);
export const useStopResizing = () => useAppStore((state) => state.stopResizing);

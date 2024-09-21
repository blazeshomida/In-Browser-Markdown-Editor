import { atom, useAtom } from "jotai";

const isMenuOpen = atom(false);
export const useMenuOpen = () => {
  const [isMenuOpenState, setIsMenuOpenState] = useAtom(isMenuOpen);
  const toggleMenu = () => setIsMenuOpenState(!isMenuOpenState);
  return [isMenuOpenState, toggleMenu] as const;
};

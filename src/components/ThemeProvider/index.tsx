"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <NextThemeProvider attribute={"class"}>{children}</NextThemeProvider>;
};

export default ThemeProvider;

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// වෙනස් කළ යුතු තැන:
import { type ThemeProviderProps } from "next-themes"; 

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
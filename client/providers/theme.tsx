"use client";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import { FC } from "react";

class ThemeStore {
  theme = "light";
  constructor() {
    makeAutoObservable(this);
  }
  toggleTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light";
  };
}

export const themeStore = new ThemeStore();

export const ThemeProvider: FC<{
  children: React.ReactNode;
}> = observer(({ children }: { children: React.ReactNode }) => {
  return (
    <div data-theme={themeStore.theme}>
      {children}
    </div>
  );
});

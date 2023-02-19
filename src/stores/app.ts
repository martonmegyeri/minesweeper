import { create } from 'zustand';

export enum Screen {
  Home,
  Game,
  Reset,
}

export type AppState = {
  screen: Screen;
  goToScreen(screen: Screen): void;
};

export const useApp = create<AppState>(set => ({
  screen: Screen.Home,
  goToScreen(screen: Screen) {
    set({ screen });
  },
}));

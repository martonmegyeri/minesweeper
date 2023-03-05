import { create } from 'zustand';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type SettingsState = {
  isOpen: boolean;
  options: {
    sounds: boolean;
    theme: Theme;
    parallaxMode: boolean;
  };
  openSettings(): void;
  closeSettings(): void;
  setOption(key: keyof SettingsState['options'], value: SettingsState['options'][keyof SettingsState['options']]): void;
};

export const useSettings = create<SettingsState>(set => ({
  isOpen: false,
  options: {
    sounds: true,
    theme: Theme.Dark,
    parallaxMode: true,
  },
  openSettings() {
    set({ isOpen: true });
  },
  closeSettings() {
    set({ isOpen: false });
  },
  setOption(key, value) {
    set(state => ({
      options: {
        ...state.options,
        [key]: value,
      },
    }));
  },
}));

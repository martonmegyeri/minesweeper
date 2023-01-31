import { create } from 'zustand';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type SettingsState = {
  isOpen: boolean;
  options: {
    theme: Theme;
    perspectiveMode: boolean;
  };
  openSettings(): void;
  closeSettings(): void;
  setOption(key: keyof SettingsState['options'], value: SettingsState['options'][keyof SettingsState['options']]): void;
};

export const useSettings = create<SettingsState>(set => ({
  isOpen: false,
  options: {
    theme: Theme.Dark,
    perspectiveMode: true,
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

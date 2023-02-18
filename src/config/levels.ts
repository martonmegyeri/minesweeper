export enum Level {
  Easy,
  Medium,
  Hard,
}

export const LEVELS = {
  [Level.Easy]: {
    width: 8,
    height: 8,
    mines: 10,
  },
  [Level.Medium]: {
    width: 12,
    height: 12,
    mines: 24,
  },
  [Level.Hard]: {
    width: 16,
    height: 16,
    mines: 50,
  },
};

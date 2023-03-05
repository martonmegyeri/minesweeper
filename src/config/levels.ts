export enum Level {
  Easy,
  Medium,
  Hard,
}

export type LevelDetails = {
  width: number;
  height: number;
  mines: number;
};

export const LEVELS: Record<Level, LevelDetails> = {
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

export enum Level {
  Beginner,
  Intermediate,
  Expert,
}

export const LEVELS = {
  [Level.Beginner]: {
    width: 9,
    height: 9,
    mines: 10,
  },
  [Level.Intermediate]: {
    width: 16,
    height: 16,
    mines: 40,
  },
  [Level.Expert]: {
    width: 30,
    height: 16,
    mines: 99,
  },
};

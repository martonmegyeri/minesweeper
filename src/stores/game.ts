import { create } from 'zustand';
import { Level } from '../config/levels';

export enum Status {
  Win,
  GameOver,
  InProgress,
}

export type GameState = {
  selectedLevel: Level;
  status: Status;
  selectLevel(level: Level): void;
  setStatus(status: Status): void;
};

export const useGame = create<GameState>(set => ({
  selectedLevel: Level.Beginner,
  status: Status.InProgress,
  selectLevel(level) {
    set({ selectedLevel: level });
  },
  setStatus(status) {
    set({ status });
  },
}));

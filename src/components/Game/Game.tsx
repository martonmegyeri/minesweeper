import { useEffect, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { Screen, useApp } from '../../stores/app';
import { Status, useGame } from '../../stores/game';
import Button from '../Button';
import PageTransition from '../PageTransition';
import Board from './Board/Board';
import Confetties from './Confetties/Confetties';
import styles from './Game.module.scss';
import Timer from './Timer/Timer';

export default function Game() {
  const [timeMs, setTimeMs] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const goToScreen = useApp(state => state.goToScreen);
  const [status, setStatus] = useGame(state => [state.status, state.setStatus], shallow);

  useEffect(() => {
    return () => stopTimer();
  }, []);

  const startTimer = () => {
    intervalRef.current = setInterval(() => setTimeMs(prevValue => prevValue + 1), 1000);
  };

  const stopTimer = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
  };

  return (
    <PageTransition className={styles.game}>
      {status === Status.Win && <Confetties />}
      <div className={styles.content}>
        <Timer time={timeMs} />
        <Board onStartTimer={startTimer} onStopTimer={stopTimer} />
        <h1 className={styles.status}>
          {status === Status.Win && 'You Win!'}
          {status === Status.GameOver && 'Game Over...'}
        </h1>
        <Button
          onClick={() => {
            goToScreen(Screen.Home);
            setStatus(Status.InProgress);
          }}
        >
          Back to the main menu
        </Button>
      </div>
    </PageTransition>
  );
}

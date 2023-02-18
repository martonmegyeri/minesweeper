import { useEffect, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';
import back from '../../assets/images/arrow-back.svg';
import restart from '../../assets/images/restart.svg';
import { Screen, useApp } from '../../stores/app';
import { Status, useGame } from '../../stores/game';
import IconButton from '../IconButton';
import Page from '../Page';
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
    <Page
      className={styles.game}
      footerActionElements={[
        <IconButton
          key={0}
          color="blue"
          onClick={() => {
            goToScreen(Screen.Home);
            setStatus(Status.InProgress);
          }}
          icon={<img src={back} alt="Back to the main menu" />}
        />,
        <IconButton key={1} color="blue" onClick={() => {}} icon={<img src={restart} alt="Restart" />} />,
      ]}
    >
      {status === Status.Win && <Confetties />}
      <div className={styles.content}>
        <Timer time={timeMs} />
        <Board onStartTimer={startTimer} onStopTimer={stopTimer} />
      </div>
    </Page>
  );
}

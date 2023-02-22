import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import back from '../../assets/images/arrow-back.svg';
import restart from '../../assets/images/restart.svg';
import { Screen, useApp } from '../../stores/app';
import { Status, useGame } from '../../stores/game';
import useTimer from '../../utils/use-timer';
import IconButton from '../IconButton';
import Page from '../Page';
import Board from './Board/Board';
import CompletedModal from './CompletedModal/CompletedModal';
import Confetties from './Confetties/Confetties';
import styles from './Game.module.scss';
import Timer from './Timer/Timer';

export default function Game() {
  const [timerSeconds, timerActions] = useTimer();
  const goToScreen = useApp(state => state.goToScreen);
  const [status, setStatus] = useGame(state => [state.status, state.setStatus], shallow);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  useEffect(() => {
    if (status === Status.Win || status === Status.GameOver) {
      setTimeout(() => setIsCompletedModalOpen(true), 2000);
    }
  }, [status]);

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
        <IconButton
          key={1}
          color="blue"
          onClick={() => {
            goToScreen(Screen.Reset);
            setStatus(Status.InProgress);
          }}
          icon={<img src={restart} alt="Restart" />}
        />,
      ]}
    >
      {status === Status.Win && <Confetties />}
      <div className={styles.content}>
        <Timer time={timerSeconds} />
        <Board onStartTimer={timerActions.start} onStopTimer={timerActions.stop} />
      </div>
      <CompletedModal isOpen={isCompletedModalOpen} />
    </Page>
  );
}

import { useEffect, useReducer, useState } from 'react';
import { shallow } from 'zustand/shallow';
import back from '../../assets/images/arrow-back.svg';
import restart from '../../assets/images/restart.svg';
import { LEVELS } from '../../config/levels';
import { Screen, useApp } from '../../stores/app';
import { Status, useGame } from '../../stores/game';
import useTimer from '../../utils/use-timer';
import IconButton from '../IconButton';
import Page from '../Page';
import Board from './Board/Board';
import CompletedModal from './CompletedModal/CompletedModal';
import Confetties from './Confetties/Confetties';
import styles from './Game.module.scss';
import Header from './Header/Header';

export default function Game() {
  const [elapsedTime, timerActions] = useTimer();
  const goToScreen = useApp(state => state.goToScreen);
  const [status, setStatus, selectedLevel] = useGame(
    state => [state.status, state.setStatus, state.selectedLevel],
    shallow
  );
  const levelDetails = LEVELS[selectedLevel];
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [moves, incrementMoves] = useReducer((prevValue: number) => prevValue + 1, 0);
  const [remainingFlags, setRemainingFlags] = useState(levelDetails.mines);

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
        <div>
          <Header elapsedTime={elapsedTime} moves={moves} remainingFlags={remainingFlags} />
          <Board
            onStartTimer={timerActions.start}
            onStopTimer={timerActions.stop}
            onMove={incrementMoves}
            onPlaceFlag={placedFlags => setRemainingFlags(levelDetails.mines - placedFlags)}
          />
        </div>
      </div>
      <CompletedModal
        isOpen={isCompletedModalOpen}
        elapsedTime={elapsedTime}
        moves={moves}
        onClose={() => setIsCompletedModalOpen(false)}
      />
    </Page>
  );
}

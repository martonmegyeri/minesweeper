import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { Screen, useApp } from '../../../stores/app';
import { Status, useGame } from '../../../stores/game';
import formatTime from '../../../utils/format-time';
import Button from '../../Button';
import Modal from '../../Modal';
import ParallaxLayerContainer from '../../ParallaxLayerContainer';
import styles from './CompletedModal.module.scss';
import GlowEffect from './GlowEffect/GlowEffect';

type Props = {
  isOpen: boolean;
  elapsedTime: number;
  moves: number;
  onClose: () => void;
};

export default function CompletedModal({ isOpen, elapsedTime, moves, onClose }: Props) {
  const goToScreen = useApp(state => state.goToScreen);
  const [status, setStatus] = useGame(state => [state.status, state.setStatus], shallow);
  const [modalStatus, setModalStatus] = useState<Status | null>(null);

  useEffect(() => {
    if (status === Status.Win || status === Status.GameOver) {
      setModalStatus(status);
    }
  }, [status]);

  const handleRestart = () => {
    goToScreen(Screen.Reset);
    setStatus(Status.InProgress);
  };

  const handleBackToMenu = () => {
    goToScreen(Screen.Home);
    setStatus(Status.InProgress);
  };

  return (
    <Modal className={styles.completedModal} contentClassName={styles.modalBody} isOpen={isOpen} onClose={onClose}>
      <header className={styles.header}>
        {modalStatus === Status.Win && <GlowEffect className={styles.glowEffect} />}
        <ParallaxLayerContainer strengthFactor={300}>
          <div className={styles.ribbon}>
            <div className={classNames(styles.leftPart, styles.shadow)} />
            <div className={styles.leftPart} />
            <div className={styles.centerPart}>{getStatusMessage(modalStatus)}</div>
            <div className={classNames(styles.rightPart, styles.shadow)} />
            <div className={styles.rightPart} />
          </div>
        </ParallaxLayerContainer>
      </header>
      <ul className={styles.details}>
        <Detail title="Time">{formatTime(elapsedTime)}</Detail>
        <Detail title="Moves">{moves}</Detail>
      </ul>
      <div className={styles.actions}>
        <Button color="blue" onClick={handleRestart}>
          Restart
        </Button>
        <Button onClick={handleBackToMenu}>Main menu</Button>
      </div>
    </Modal>
  );
}

type DetailProps = {
  title: string;
  children: number | string;
};

function Detail({ title, children }: DetailProps) {
  return (
    <li>
      <p className={styles.title}>{title}</p>
      <div className={styles.value}>{children}</div>
    </li>
  );
}

function getStatusMessage(status: Status | null) {
  switch (status) {
    case Status.Win:
      return 'You Win!';
    case Status.GameOver:
      return 'Game Over';
    default:
      return null;
  }
}

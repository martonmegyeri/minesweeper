import { shallow } from 'zustand/shallow';
import { Screen, useApp } from '../../../stores/app';
import { Status, useGame } from '../../../stores/game';
import Button from '../../Button';
import Modal from '../../Modal';
import styles from './CompletedModal.module.scss';

type Props = {
  isOpen: boolean;
};

export default function CompletedModal({ isOpen }: Props) {
  const goToScreen = useApp(state => state.goToScreen);
  const [status, setStatus] = useGame(state => [state.status, state.setStatus], shallow);

  const handleRestart = () => {
    goToScreen(Screen.Reset);
    setStatus(Status.InProgress);
  };

  const handleBackToMenu = () => {
    goToScreen(Screen.Home);
    setStatus(Status.InProgress);
  };

  return (
    <Modal className={styles.completedModal} contentClassName={styles.modalBody} isOpen={isOpen}>
      <header className={styles.header}>
        {status === Status.Win && 'Congratulations!'}
        {status === Status.GameOver && 'GAME OVER'}
      </header>
      <div className={styles.actions}>
        <Button color="green" onClick={handleRestart}>
          Restart
        </Button>
        <Button color="blue" onClick={handleBackToMenu}>
          Back to the menu
        </Button>
      </div>
    </Modal>
  );
}

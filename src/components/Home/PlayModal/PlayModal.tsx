import { Level } from '../../../config/levels';
import { Screen, useApp } from '../../../stores/app';
import { useGame } from '../../../stores/game';
import Button from '../../Button';
import Modal from '../../Modal';
import styles from './PlayModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PlayModal({ isOpen, onClose }: Props) {
  const selectLevel = useGame(state => state.selectLevel);
  const goToScreen = useApp(state => state.goToScreen);

  const handleLevelClick = (level: Level) => {
    selectLevel(level);
    goToScreen(Screen.Game);
  };

  return (
    <Modal className={styles.playModal} contentClassName={styles.modalBody} isOpen={isOpen} onClose={onClose}>
      <ul className={styles.list}>
        <li>
          <Button color="green" onClick={() => handleLevelClick(Level.Easy)}>
            Easy
          </Button>
        </li>
        <li>
          <Button onClick={() => handleLevelClick(Level.Medium)}>Medium</Button>
        </li>
        <li>
          <Button color="red" onClick={() => handleLevelClick(Level.Hard)}>
            Hard
          </Button>
        </li>
      </ul>
    </Modal>
  );
}

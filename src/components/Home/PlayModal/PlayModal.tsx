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
    <Modal
      title="Play"
      className={styles.playModal}
      contentClassName={styles.modalBody}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ul className={styles.list}>
        <li>
          <Button color="green" size="small" onClick={() => handleLevelClick(Level.Beginner)}>
            Beginner
          </Button>
        </li>
        <li>
          <Button size="small" onClick={() => handleLevelClick(Level.Intermediate)}>
            Intermediate
          </Button>
        </li>
        <li>
          <Button color="red" size="small" onClick={() => handleLevelClick(Level.Expert)}>
            Expert
          </Button>
        </li>
      </ul>
    </Modal>
  );
}
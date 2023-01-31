import { useState } from 'react';
import Button from '../Button';
import styles from './Home.module.scss';
import PlayModal from './PlayModal/PlayModal';

export default function Home() {
  const [modalState, setModalState] = useState<'play' | null>(null);

  return (
    <div className={styles.home}>
      <ul className={styles.navigationList}>
        <Button onClick={() => setModalState('play')} className={styles.button}>
          Play
        </Button>
      </ul>
      <PlayModal isOpen={modalState === 'play'} onClose={() => setModalState(null)} />
    </div>
  );
}

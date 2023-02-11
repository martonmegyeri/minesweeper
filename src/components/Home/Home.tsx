import { useState } from 'react';
import bomb from '../../assets/images/bomb.png';
import Button from '../Button';
import PageTransition from '../PageTransition';
import styles from './Home.module.scss';
import PlayModal from './PlayModal/PlayModal';

export default function Home() {
  const [modalState, setModalState] = useState<'play' | null>(null);

  return (
    <PageTransition className={styles.home}>
      <div className={styles.logo}>
        <img src={bomb} alt="bomb" className={styles.bomb} />
        <h1 className={styles.title}>
          Mine
          <br />
          sweeper
        </h1>
      </div>
      <ul className={styles.navigationList}>
        <Button size="large" onClick={() => setModalState('play')}>
          Play
        </Button>
      </ul>
      <PlayModal isOpen={modalState === 'play'} onClose={() => setModalState(null)} />
    </PageTransition>
  );
}

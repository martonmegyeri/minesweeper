import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import bomb from '~/assets/images/bomb.png';
import Button from '../Button';
import Page from '../Page';
import styles from './Home.module.scss';
import PlayModal from './PlayModal/PlayModal';

export default function Home() {
  const [modalState, setModalState] = useState<'play' | null>(null);
  const [isFontReady, setIsFontReady] = useState(false);

  useEffect(() => {
    document.fonts.load('12px Lily Script One').then(() => setIsFontReady(true));
  }, []);

  return (
    <Page className={styles.home}>
      <motion.div
        animate={{ opacity: isFontReady ? 1 : 0, scale: isFontReady ? 1 : 0.5 }}
        initial={false}
        transition={{ type: 'spring' }}
        className={styles.logo}
      >
        <img src={bomb} alt="bomb" className={styles.bomb} />
        <h1 className={styles.title}>
          Mine
          <br />
          sweeper
        </h1>
      </motion.div>
      <ul className={styles.navigationList}>
        <Button size="large" onClick={() => setModalState('play')}>
          Play
        </Button>
      </ul>
      <PlayModal isOpen={modalState === 'play'} onClose={() => setModalState(null)} />
    </Page>
  );
}

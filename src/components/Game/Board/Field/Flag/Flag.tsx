import { motion, Spring, Tween } from 'framer-motion';
import styles from './Flag.module.scss';

const transitionIn: Spring = { type: 'spring', damping: 12, stiffness: 120 };
const transitionOut: Tween = { type: 'tween', duration: 0.2 };

export default function Flag() {
  return (
    <div className={styles.flagContainer}>
      <motion.div
        className={styles.base}
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: transitionIn }}
        exit={{ scale: 0, transition: { type: 'spring', damping: 20, stiffness: 150 } }}
      />
      <motion.div
        className={styles.bar}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1, transition: transitionIn }}
        exit={{ scaleY: 0, transition: transitionOut }}
      />
      <motion.div
        className={styles.flag}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1, transition: transitionIn }}
        exit={{ scaleX: 0, opacity: 0, transition: transitionOut }}
      />
    </div>
  );
}

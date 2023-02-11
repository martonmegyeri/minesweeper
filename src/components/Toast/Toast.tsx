import classNames from 'classnames';
import { motion } from 'framer-motion';
import styles from './Toast.module.scss';
import { ToastType } from './Toasts';

type Props = {
  isVisible: boolean;
  message: string;
  type: ToastType;
};

export default function Toast({ isVisible, message, type }: Props) {
  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -25, x: '-50%' }}
      transition={{ type: 'spring', damping: 12, stiffness: 250 }}
      initial={false}
      className={classNames(styles.toast, styles[type], { [styles.visible]: isVisible })}
    >
      <i className={styles.icon} />
      {message}
    </motion.div>
  );
}

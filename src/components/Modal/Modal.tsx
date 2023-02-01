import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import CloseButton from '../CloseButton';
import PerspectiveContainer from '../PerspectiveContainer';
import styles from './Modal.module.scss';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

const springIn = {
  type: 'spring',
  damping: 15,
  stiffness: 250,
};

const springOut = {
  type: 'spring',
  damping: 30,
  stiffness: 400,
};

export default function Modal({ isOpen, onClose, children, className, contentClassName }: Props) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className={classNames(styles.modal, className, {
            [styles.open]: isOpen,
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: springIn }}
          exit={{ opacity: 0, transition: springOut }}
        >
          <div className={styles.background} onClick={() => onClose?.()} />
          <PerspectiveContainer>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1, transition: springIn }}
              exit={{ scale: 0.8, transition: springOut }}
              className={styles.body}
            >
              <CloseButton onClick={onClose} className={styles.close} />
              <div className={classNames(styles.content, contentClassName)}>{children}</div>
            </motion.div>
          </PerspectiveContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

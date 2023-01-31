import classNames from 'classnames';
import { ReactNode } from 'react';
import CloseButton from '../CloseButton';
import PerspectiveContainer from '../PerspectiveContainer';
import styles from './Modal.module.scss';

type Props = {
  title: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};
export default function Modal({ title, isOpen, onClose, children, className, contentClassName }: Props) {
  return (
    <div
      className={classNames(styles.modal, className, {
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.background} onClick={() => onClose?.()} />
      <PerspectiveContainer>
        <div className={styles.body}>
          <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <CloseButton onClick={onClose} className={styles.close} />
          </div>
          <div className={classNames(styles.content, contentClassName)}>{children}</div>
        </div>
      </PerspectiveContainer>
    </div>
  );
}

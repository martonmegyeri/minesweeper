import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Field.module.scss';
import Flag from './Flag/Flag';
import Mine from './Mine/Mine';
import Text from './Text/Text';

type Props = {
  text: string;
  isMine: boolean;
  isFlagged: boolean;
  isRevealed: boolean;
  borderHeight?: number;
  onLeftClick: () => void;
  onRightClick: () => void;
};

export default function Field({
  text,
  isMine,
  isFlagged,
  isRevealed,
  borderHeight = 6,
  onLeftClick,
  onRightClick,
}: Props) {
  return (
    <button
      className={classNames(styles.field, {
        [styles.mine]: isMine,
        [styles.revealed]: isRevealed,
      })}
      style={{ '--bottom-border-height': `${borderHeight}px` } as React.CSSProperties}
      onClick={onLeftClick}
      onContextMenu={event => {
        event.preventDefault();
        onRightClick();
      }}
    >
      <motion.div
        style={{ y: -borderHeight }}
        whileTap={!isRevealed && !isFlagged ? { y: -borderHeight * 0.4 } : {}}
        whileHover={{ y: -borderHeight * 0.75 }}
        transition={{ type: 'spring', damping: 15, stiffness: 350 }}
        className={styles.content}
      >
        <AnimatePresence initial={false}>
          {isRevealed && text && <Text>{text}</Text>}
          {isRevealed && isMine && <Mine />}
          {!isRevealed && isFlagged && <Flag />}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Field.module.scss';
import Flag from './Flag/Flag';
import Mine from './Mine/Mine';
import Text from './Text/Text';
import Texture from './Texture/Texture';

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
        whileHover={!isRevealed && !isFlagged ? { y: -borderHeight * 0.75 } : {}}
        transition={{ type: 'spring', damping: 15, stiffness: 350 }}
        className={styles.content}
      >
        <AnimatePresence initial={false}>
          {isRevealed && text && <Text key={0}>{text}</Text>}
          {isRevealed && isMine && <Mine key={1} />}
          {!isRevealed && isFlagged && <Flag key={2} />}
          {(!isRevealed || (isRevealed && !isMine)) && <Texture key={3} />}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}

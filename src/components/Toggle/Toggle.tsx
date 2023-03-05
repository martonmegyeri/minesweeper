import { ChangeEvent, HTMLProps } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import styles from './Toggle.module.scss';

type Props = HTMLProps<HTMLInputElement> & {
  on: boolean;
  onToggle: (on: boolean) => void;
  pointTransformX?: number;
};

export default function Toggle({ on, onToggle, pointTransformX = 26, ...rest }: Props) {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  };

  return (
    <div
      className={classNames(styles.toggle, { [styles.on]: on })}
      style={{ '--point-transform-x': `${pointTransformX}px` } as React.CSSProperties}
    >
      <input {...rest} type="checkbox" checked={on} onChange={onChangeHandler} />
      <div className={styles.visual}>
        <motion.div
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          animate={{ x: on ? pointTransformX : 0 }}
          className={styles.dot}
        >
          {on ? 'on' : 'off'}
        </motion.div>
      </div>
    </div>
  );
}

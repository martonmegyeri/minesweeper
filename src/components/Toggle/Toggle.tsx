import { ChangeEvent, HTMLProps } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import styles from './Toggle.module.scss';

type Props = HTMLProps<HTMLInputElement> & {
  on: boolean;
  onToggle: (on: boolean) => void;
};

export default function Toggle({ on, onToggle, ...rest }: Props) {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  };

  return (
    <div className={classNames(styles.toggle, { [styles.on]: on })}>
      <input {...rest} type="checkbox" checked={on} onChange={onChangeHandler} />
      <div className={styles.visual}>
        <motion.div
          transition={{ type: 'spring', damping: 19, stiffness: 350 }}
          animate={{ x: on ? 20 : 0 }}
          className={styles.dot}
        ></motion.div>
      </div>
    </div>
  );
}

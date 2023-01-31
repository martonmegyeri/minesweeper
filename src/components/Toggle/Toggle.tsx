import { ChangeEvent, HTMLProps } from 'react';

import classNames from 'classnames';
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
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}

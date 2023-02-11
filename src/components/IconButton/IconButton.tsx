import classNames from 'classnames';
import { ReactElement } from 'react';
import Button, { ButtonProps } from '../Button/Button';
import styles from './IconButton.module.scss';

type Props = Omit<ButtonProps, 'children'> & {
  icon: ReactElement;
};

export default function IconButton({ icon, ...rest }: Props) {
  return (
    <Button {...rest} className={classNames(styles.iconButton, rest.className)} contentClassName={styles.content}>
      <div className={styles.icon}>{icon}</div>
    </Button>
  );
}

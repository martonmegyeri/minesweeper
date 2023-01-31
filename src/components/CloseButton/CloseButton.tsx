import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import Button from '../Button/Button';
import styles from './CloseButton.module.scss';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'>;

export default function CloseButton({ ...rest }: Props) {
  return (
    <Button
      color="red"
      {...rest}
      className={classNames(styles.closeButton, rest.className)}
      contentClassName={styles.content}
    >
      <span className={styles.closeMark}>&#x00D7;</span>
    </Button>
  );
}

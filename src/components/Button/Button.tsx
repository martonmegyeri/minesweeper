import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactElement } from 'react';
import styles from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'normal' | 'small';
  color?: 'orange' | 'green' | 'blue' | 'red';
  children: string | ReactElement;
  contentClassName?: string;
};

export default function Button({ size = 'normal', color = 'orange', children, contentClassName, ...rest }: Props) {
  return (
    <button {...rest} className={classNames(styles.button, [styles[size]], [styles[color]], rest.className)}>
      <div className={classNames(styles.content, contentClassName)}>{children}</div>
    </button>
  );
}

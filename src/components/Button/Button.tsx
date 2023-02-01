import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, CSSProperties, ReactElement } from 'react';
import styles from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'normal' | 'small';
  color?: 'orange' | 'green' | 'blue' | 'red';
  borderHeight?: number;
  children: string | ReactElement;
  contentClassName?: string;
};

export default function Button({
  size = 'normal',
  color = 'orange',
  borderHeight = 8,
  children,
  contentClassName,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={classNames(styles.button, [styles[size]], [styles[color]], rest.className)}
      style={{ '--bottom-border-height': `${borderHeight}px` } as CSSProperties}
    >
      <motion.div
        style={{ y: -borderHeight }}
        whileTap={{ y: -borderHeight / 2 }}
        transition={{ type: 'spring', damping: 15, stiffness: 350 }}
        className={classNames(styles.content, contentClassName)}
      >
        {children}
      </motion.div>
    </button>
  );
}

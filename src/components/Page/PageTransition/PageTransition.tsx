import classNames from 'classnames';
import { motion } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './PageTransition.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function PageTransition({ children, ...rest }: Props) {
  return (
    <div {...rest} className={classNames(styles.pageTransition, rest.className)}>
      <motion.div
        className={styles.mask}
        initial={{
          WebkitMask: 'radial-gradient(circle, hsla(0, 0%, 0%, 0%) -40%, black 0%)',
        }}
        animate={{
          WebkitMask: 'radial-gradient(circle, hsla(0, 0%, 0%, 0%) 100%, black 140%)',
        }}
        exit={{
          WebkitMask: 'radial-gradient(circle, hsla(0, 0%, 0%, 0%) -40%, black 0%)',
        }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.8 }}
      />
      {children}
    </div>
  );
}

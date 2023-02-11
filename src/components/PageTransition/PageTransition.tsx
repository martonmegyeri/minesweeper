import classNames from 'classnames';
import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './PageTransition.module.scss';

type Props = HTMLMotionProps<'div'> & {
  children: ReactNode;
};

export default function PageTransition({ children, ...rest }: Props) {
  return (
    <motion.div
      {...rest}
      className={classNames(styles.pageTransition, rest.className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

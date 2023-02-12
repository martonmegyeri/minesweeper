import { HTMLAttributes, ReactNode } from 'react';
import Footer from '../Footer';
import styles from './Page.module.scss';
import PageTransition from './PageTransition/PageTransition';

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Page({ children, ...rest }: Props) {
  return (
    <PageTransition className={styles.page}>
      <div {...rest}>{children}</div>
      <Footer />
    </PageTransition>
  );
}

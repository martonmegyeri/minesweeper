import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import Footer from '../Footer';
import styles from './Page.module.scss';
import PageTransition from './PageTransition/PageTransition';

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  footerActionElements?: ReactElement[];
};

export default function Page({ children, footerActionElements, ...rest }: Props) {
  return (
    <PageTransition className={styles.page}>
      <div {...rest}>{children}</div>
      <Footer actionElements={footerActionElements} />
    </PageTransition>
  );
}

import { useEffect, useState } from 'react';
import info from '~/assets/images/alert-info.svg';
import Modal from '../../Modal';
import styles from './NotSupportedBrowserModal.module.scss';

export default function NotSupportedBrowserModal() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(window.matchMedia('(max-width: 900px)').matches);
  }, []);

  return (
    <Modal className={styles.notSupportedBrowserModal} contentClassName={styles.modalBody} isOpen={isSmallScreen}>
      <img src={info} alt="Info" className={styles.icon} width={80} height={80} />
      <h1>Not supported browser.</h1>
      <p>For the best experience, please use a browser with at least 900px horizontal&nbsp;width.</p>
    </Modal>
  );
}

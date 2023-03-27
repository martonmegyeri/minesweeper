import { ReactElement } from 'react';
import settings from '~/assets/images/settings.svg';
import { useSettings } from '~/stores/settings';
import IconButton from '../IconButton';
import styles from './Footer.module.scss';

type Props = {
  actionElements?: ReactElement[];
};

export default function Footer({ actionElements }: Props) {
  const openSettings = useSettings(state => state.openSettings);

  return (
    <footer className={styles.footer}>
      <div />
      <div className={styles.center}>
        <span>Created by </span>
        <a href="https://martonmegyeri.com" target="_blank" rel="noopener noreferrer">
          Marton Megyeri
        </a>
      </div>
      <div className={styles.actions}>
        {actionElements}
        <IconButton onClick={openSettings} color="blue" icon={<img src={settings} alt="settings" />} />
      </div>
    </footer>
  );
}

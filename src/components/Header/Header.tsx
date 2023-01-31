import settings from '../../assets/images/settings.svg';
import { useSettings } from '../../stores/settings';
import styles from './Header.module.scss';

export default function Header() {
  const openSettings = useSettings(state => state.openSettings);

  return (
    <header className={styles.header}>
      <nav className={styles.actions}>
        <button className={styles.action} onClick={openSettings}>
          <img src={settings} alt="settings" width={26} height={26} />
        </button>
      </nav>
    </header>
  );
}

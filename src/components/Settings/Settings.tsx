import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { Theme, useSettings } from '~/stores/settings';
import usePrevious from '~/utils/use-previous';
import Modal from '../Modal/Modal';
import Toggle from '../Toggle/Toggle';
import styles from './Settings.module.scss';

export default function Settings() {
  const [isOpen, openSettings, closeSettings] = useSettings(
    state => [state.isOpen, state.openSettings, state.closeSettings],
    shallow
  );
  const [options, setOption] = useSettings(state => [state.options, state.setOption], shallow);
  const prevOptions = usePrevious(options);

  useEffect(() => {
    document.body.dataset.theme = options.theme;
  }, [options.theme]);

  return (
    <Modal className={styles.settings} contentClassName={styles.modalBody} isOpen={isOpen} onClose={closeSettings}>
      <div className={styles.row}>
        Dark Mode
        <Toggle on={options.theme === Theme.Dark} onToggle={on => setOption('theme', on ? Theme.Dark : Theme.Light)} />
      </div>
      <div className={styles.row}>
        Parallax Effect
        <Toggle on={options.parallaxMode} onToggle={on => setOption('parallaxMode', on)} />
      </div>
    </Modal>
  );
}

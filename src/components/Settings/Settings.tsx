import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { Theme, useSettings } from '../../stores/settings';
import usePrevious from '../../utils/use-previous';
import Modal from '../Modal/Modal';
import { useToast } from '../Toast/Toasts';
import Toggle from '../Toggle/Toggle';
import styles from './Settings.module.scss';

export default function Settings() {
  const [isOpen, openSettings, closeSettings] = useSettings(
    state => [state.isOpen, state.openSettings, state.closeSettings],
    shallow
  );
  const [options, setOption] = useSettings(state => [state.options, state.setOption], shallow);
  const prevOptions = usePrevious(options);
  const showToast = useToast(state => state.show);

  useEffect(() => {
    document.body.dataset.theme = options.theme;
  }, [options.theme]);

  useEffect(() => {
    if (prevOptions === undefined) return;

    if (prevOptions?.theme !== options.theme) {
      showToast(`Dark mode ${options.theme === Theme.Dark ? 'on' : 'off'}`);
    }

    if (prevOptions?.perspectiveMode !== options.perspectiveMode) {
      showToast(`3D Perspective Effect ${options.perspectiveMode ? 'on' : 'off'}`);
    }
  }, [options]);

  return (
    <Modal
      title="Settings"
      className={styles.settings}
      contentClassName={styles.modalBody}
      isOpen={isOpen}
      onClose={closeSettings}
    >
      <div className={styles.block}>
        <div className={styles.row}>
          Dark Mode
          <Toggle
            on={options.theme === Theme.Dark}
            onToggle={on => setOption('theme', on ? Theme.Dark : Theme.Light)}
          />
        </div>
        <div className={styles.row}>
          3D Perspective Effect
          <Toggle on={options.perspectiveMode} onToggle={on => setOption('perspectiveMode', on)} />
        </div>
      </div>
    </Modal>
  );
}

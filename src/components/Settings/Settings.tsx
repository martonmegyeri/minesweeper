import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { Theme, useSettings } from '../../stores/settings';
import usePrevious from '../../utils/use-previous';
import Modal from '../Modal/Modal';
import { useToast } from '../Toast';
import { ToastType } from '../Toast/Toasts';
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
      const on = options.theme === Theme.Dark;
      const type = on ? ToastType.Success : ToastType.Info;
      showToast(`Dark mode ${on ? 'on' : 'off'}`, type);
    }

    if (prevOptions?.parallaxMode !== options.parallaxMode) {
      const on = options.parallaxMode;
      const type = on ? ToastType.Success : ToastType.Info;
      showToast(`Parallax Effect ${on ? 'on' : 'off'}`, type);
    }
  }, [options]);

  return (
    <Modal className={styles.settings} contentClassName={styles.modalBody} isOpen={isOpen} onClose={closeSettings}>
      <div className={styles.block}>
        <div className={styles.row}>
          Dark Mode
          <Toggle
            on={options.theme === Theme.Dark}
            onToggle={on => setOption('theme', on ? Theme.Dark : Theme.Light)}
          />
        </div>
        <div className={styles.row}>
          Parallax Effect
          <Toggle on={options.parallaxMode} onToggle={on => setOption('parallaxMode', on)} />
        </div>
      </div>
    </Modal>
  );
}

import classNames from 'classnames';
import styles from './Toast.module.scss';

type Props = {
  isVisible: boolean;
  message: string;
};

export default function Toast({ isVisible, message }: Props) {
  return <div className={classNames(styles.toast, { [styles.visible]: isVisible })}>{message}</div>;
}

import classNames from 'classnames';
import styles from './SplitText.module.scss';

type Props = {
  children: string;
  size: 'small' | 'large';
  color?: 'light' | 'dark';
};

export default function SplitText({ children, size = 'large', color = 'light' }: Props) {
  return (
    <div className={classNames(styles.splitText, [styles[size]], [styles[color]])}>
      {children}
      <span className={styles.mask}>
        <span>{children}</span>
      </span>
      <span className={styles.mask}>
        <span>{children}</span>
      </span>
    </div>
  );
}

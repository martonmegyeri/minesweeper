import classNames from 'classnames';
import styles from './Confetties.module.scss';

type Props = {
  numberOfConfetties?: number;
};

export default function Confetties({ numberOfConfetties = 250 }: Props) {
  return (
    <div className={styles.confetties}>
      {Array.from({ length: numberOfConfetties }).map((_, i) => (
        <div key={i} className={classNames(styles.confetti, styles[`confetti-${i}`])} />
      ))}
    </div>
  );
}

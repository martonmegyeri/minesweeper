import hourglass from '../../../assets/images/hourglass.svg';
import styles from './Timer.module.scss';

type Props = {
  time: number;
};

export default function Timer({ time }: Props) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const formattedTime = `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`;

  return (
    <div className={styles.timer}>
      <img src={hourglass} alt="timer" />
      <div className={styles.time}>{formattedTime}</div>
    </div>
  );
}

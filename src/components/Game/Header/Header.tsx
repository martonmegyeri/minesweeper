import clock from '../../../assets/images/clock.svg';
import flag from '../../../assets/images/flag.svg';
import pointer from '../../../assets/images/mouse-pointer.svg';
import formatTime from '../../../utils/format-time';
import styles from './Header.module.scss';

type Props = {
  elapsedTime: number;
  moves: number;
  remainingFlags: number;
};

export default function Header({ elapsedTime, moves, remainingFlags }: Props) {
  return (
    <ul className={styles.header}>
      <Item icon={pointer} title="Moves">
        {moves}
      </Item>
      <Item icon={clock} title="Time">
        {formatTime(elapsedTime)}
      </Item>
      <Item icon={flag} title="Flags">
        {remainingFlags}
      </Item>
    </ul>
  );
}

type ItemProps = {
  icon: string;
  title: string;
  children: number | string;
};

function Item({ icon, title, children }: ItemProps) {
  return (
    <li>
      <img className={styles.icon} src={icon} alt={title} />
      <div className={styles.value}>{children}</div>
    </li>
  );
}

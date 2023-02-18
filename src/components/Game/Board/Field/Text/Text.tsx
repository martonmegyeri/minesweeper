import classNames from 'classnames';
import styles from './Text.module.scss';

type Props = {
  children: string;
};

export default function Text({ children }: Props) {
  return (
    <svg
      className={classNames(styles.text, {
        [styles.blue]: children === '1',
        [styles.green]: children === '2',
        [styles.red]: parseInt(children) >= 3,
      })}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle">
        {children}
      </text>
    </svg>
  );
}

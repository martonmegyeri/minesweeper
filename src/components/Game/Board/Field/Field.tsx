import classNames from 'classnames';
import styles from './Field.module.scss';

type Props = {
  text: string;
  mine: boolean;
  flagged: boolean;
  revealed: boolean;
  rowIndex: number;
  colIndex: number;
  alternateColoring?: boolean;
  onLeftClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number) => void;
};

export default function Field({
  text,
  mine,
  flagged,
  revealed,
  rowIndex,
  colIndex,
  alternateColoring,
  onLeftClick,
  onRightClick,
}: Props) {
  return (
    <div
      className={classNames(styles.field, {
        [styles.mine]: mine,
        [styles.flagged]: flagged,
        [styles.revealed]: revealed,
        [styles.colorBlue]: parseInt(text) === 1,
        [styles.colorGreen]: parseInt(text) === 2,
        [styles.colorRed]: parseInt(text) >= 3,
        [styles.alternateColoring]: alternateColoring,
      })}
      onClick={() => onLeftClick(rowIndex, colIndex)}
      onContextMenu={event => {
        event.preventDefault();
        onRightClick(rowIndex, colIndex);
      }}
    >
      {text}
    </div>
  );
}

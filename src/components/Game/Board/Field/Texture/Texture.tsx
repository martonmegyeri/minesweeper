import classNames from 'classnames';
import { useEffect, useState } from 'react';
import getRandom from '../../../../../utils/get-random';
import styles from './Texture.module.scss';

export default function Texture() {
  const number = useRandomNumber();

  return (
    <div className={classNames(styles.texture, styles[`variant${number}`])}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function useRandomNumber() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(getRandom(0, 4));
  }, []);

  return number;
}

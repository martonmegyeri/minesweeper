import classNames from 'classnames';
import React from 'react';
import { getRandom, getRandomFloat } from '../../../../utils/get-random';
import styles from './GlowEffect.module.scss';

type Props = {
  className?: string;
};

function GlowEffect({ className }: Props) {
  return (
    <div className={classNames(styles.glowEffect, className)}>
      <div className={styles.light} />
      <div className={styles.sunburst} />
      <div className={styles.dots}>
        {Array.from({ length: 30 })
          .fill(null)
          .map((_, i) => {
            const size = getRandomFloat(2, 8);

            return (
              <div
                key={i}
                style={{
                  top: `${getRandomFloat(0, 100)}%`,
                  left: `${getRandomFloat(0, 100)}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationName: `dot-animation-${getRandom(1, 6)}`,
                  animationDuration: `${getRandomFloat(2, 5)}s`,
                  animationDelay: `${getRandomFloat(0, 5)}s`,
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default React.memo(GlowEffect);

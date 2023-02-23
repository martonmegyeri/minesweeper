import classNames from 'classnames';
import React, { ReactElement, useRef, useState } from 'react';

import { useSettings } from '../../stores/settings';
import styles from './PerspectiveContainer.module.scss';

type Props = {
  children: ReactElement;
};

export default function PerspectiveContainer({ children }: Props) {
  const options = useSettings(state => state.options);
  const innerRef = useRef<HTMLDivElement>(null);
  const lastAnimationCallRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (lastAnimationCallRef.current) {
      cancelAnimationFrame(lastAnimationCallRef.current); // If an animation frame was already requested after last repaint, cancel it in favour of the newer event
    }

    lastAnimationCallRef.current = requestAnimationFrame(() => {
      if (!innerRef.current) return;

      const rect = innerRef.current.getBoundingClientRect();
      const relativeCenterX = rect.x - event.clientX + rect.width / 2;
      const relativeCenterY = rect.y - event.clientY + rect.height / 2;

      const STRENGTH_FACTOR = 3000;
      const x = (relativeCenterX / STRENGTH_FACTOR) * -1;
      const y = relativeCenterY / STRENGTH_FACTOR;
      innerRef.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    requestAnimationFrame(() => {
      if (!innerRef.current) return;
      innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  };

  if (!options.perspectiveMode) {
    return children;
  }

  return (
    <div
      className={classNames(styles.perspectiveContainer, { [styles.hovering]: isHovering })}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.inner} ref={innerRef}>
        {children}
      </div>
    </div>
  );
}

import { motion, useSpring } from 'framer-motion';
import { ReactElement, useEffect, useRef } from 'react';

import { useSettings } from '../../stores/settings';

type Props = {
  strengthFactor?: number;
  children: ReactElement;
};

export default function ParallaxLayerContainer({ strengthFactor = 50, children }: Props) {
  const options = useSettings(state => state.options);
  const lastAnimationCallRef = useRef<number | null>(null);
  const springOptions = { stiffness: 100, damping: 10 };
  const x = useSpring(0, springOptions);
  const y = useSpring(0, springOptions);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (lastAnimationCallRef.current) {
        cancelAnimationFrame(lastAnimationCallRef.current); // If an animation frame was already requested after last repaint, cancel it in favour of the newer event
      }

      lastAnimationCallRef.current = requestAnimationFrame(() => {
        const centerX = event.clientX - window.innerWidth / 2;
        const centerY = event.clientY - window.innerHeight / 2;
        x.set(centerX / strengthFactor);
        y.set(centerY / strengthFactor);
      });
    };

    document.body.addEventListener('mousemove', handleMouseMove);
    return () => document.body.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!options.parallaxMode) {
    return children;
  }

  return <motion.div style={{ x, y }}>{children}</motion.div>;
}

import { useEffect, useRef, useState } from 'react';

type TimerReturnType = [number, { start: () => void; stop: () => void }];
type TimerOptions = {
  interval?: number;
};

/**
 * @param options.interval interval in milliseconds
 */
export default function useTimer({ interval = 1000 }: TimerOptions = {}): TimerReturnType {
  const [seconds, setSeconds] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => stop, []);

  const start = () => {
    let expected = Date.now() + interval;

    setTimeout(step, interval);

    function step() {
      const drift = Date.now() - expected;

      expected += interval;
      setSeconds(prevValue => prevValue + interval / 1000);

      const adjustedInterval = interval - drift;
      timeoutRef.current = setTimeout(step, Math.max(0, adjustedInterval));
    }
  };

  const stop = () => {
    if (!timeoutRef.current) return;
    clearInterval(timeoutRef.current);
  };

  return [seconds, { start, stop }];
}

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
    const alreadyStarted = !!timeoutRef.current;
    if (alreadyStarted) return;

    let expected = Date.now() + interval;

    timeoutRef.current = window.setTimeout(step, interval);

    function step() {
      const drift = Date.now() - expected;

      expected += interval;
      setSeconds(prevValue => prevValue + interval);

      const adjustedInterval = interval - drift;
      timeoutRef.current = window.setTimeout(step, Math.max(0, adjustedInterval));
    }
  };

  const stop = () => {
    if (!timeoutRef.current) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  return [seconds, { start, stop }];
}

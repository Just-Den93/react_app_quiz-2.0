import { useState, useEffect } from 'react';

export function useTimer(duration, onEnd, onForceStop) {
  const [seconds, setSeconds] = useState(duration);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      onEnd();
    }
  }, [seconds, onEnd]);

  const handleForceStop = () => {
    onForceStop();
  };

  return {
    seconds,
    hovered,
    setHovered,
    handleForceStop,
  };
}

import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { handleError } from '../../../../utils/errorHandling';

const ConfettiAnimation = ({ isRunning }) => {
  const intervalRef = useRef(null);

  const safeStartConfetti = () => {
    try {
      // Значення за замовчуванням для confetti
      const defaults = {
        spread: 400,
        ticks: 100,
        gravity: 0.2,
        decay: 0.95,
        startVelocity: 15,
        shapes: ['star', 'circle'],
        colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
      };

      const randomX = Math.random();
      const randomY = Math.random();

      // Основний запуск конфетті
      confetti({
        ...defaults,
        particleCount: 120,
        scalar: 2.0,
        origin: { x: randomX, y: randomY },
      });

      // Додатковий запуск для різноманітності
      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 1.5,
        origin: { x: randomX, y: randomY },
      });
    } catch (error) {
      handleError(error, 'Не вдалося запустити анімацію феєрверку.');
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(safeStartConfetti, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return <div />;
};

export default ConfettiAnimation;
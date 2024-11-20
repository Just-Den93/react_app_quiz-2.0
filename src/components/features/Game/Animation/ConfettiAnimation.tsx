// src/components/features/Game/Animation/ConfettiAnimation.tsx
import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { handleError } from '../../../../utils/errorHandling';

interface ConfettiAnimationProps {
 isRunning: boolean;
}

interface ConfettiDefaults {
 spread: number;
 ticks: number;
 gravity: number;
 decay: number;
 startVelocity: number;
 shapes: string[];
 colors: string[];
}

interface ConfettiOptions extends ConfettiDefaults {
 particleCount: number;
 scalar: number;
 origin: {
   x: number;
   y: number;
 };
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ isRunning }) => {
 const intervalRef = useRef<NodeJS.Timer | null>(null);

 // Значения по умолчанию для конфетти
 const confettiDefaults: ConfettiDefaults = {
   spread: 400,
   ticks: 100,
   gravity: 0.2,
   decay: 0.95,
   startVelocity: 15,
   shapes: ['star', 'circle'],
   colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
 };

 const safeStartConfetti = React.useCallback(() => {
   try {
     const randomX = Math.random();
     const randomY = Math.random();

     // Основной запуск конфетти
     const mainConfettiOptions: ConfettiOptions = {
       ...confettiDefaults,
       particleCount: 120,
       scalar: 2.0,
       origin: { x: randomX, y: randomY }
     };

     // Дополнительный запуск для разнообразия
     const secondaryConfettiOptions: ConfettiOptions = {
       ...confettiDefaults,
       particleCount: 30,
       scalar: 1.5,
       origin: { x: randomX, y: randomY }
     };

     // Запускаем анимацию конфетти
     confetti(mainConfettiOptions);
     confetti(secondaryConfettiOptions);

   } catch (error) {
     handleError(error, 'Не вдалося запустити анімацію феєрверку.');
   }
 }, []);

 useEffect(() => {
   if (isRunning && !intervalRef.current) {
     // Запускаем анимацию
     intervalRef.current = setInterval(safeStartConfetti, 1000);
   } else if (!isRunning && intervalRef.current) {
     // Останавливаем анимацию
     clearInterval(intervalRef.current);
     intervalRef.current = null;
   }

   // Очищаем интервал при размонтировании
   return () => {
     if (intervalRef.current) {
       clearInterval(intervalRef.current);
       intervalRef.current = null;
     }
   };
 }, [isRunning, safeStartConfetti]);

 // Возвращаем пустой div, так как компонент управляет только анимацией
 return <div data-testid="confetti-animation" />;
};

export default React.memo(ConfettiAnimation);
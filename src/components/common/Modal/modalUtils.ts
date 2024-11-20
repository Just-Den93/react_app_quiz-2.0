// src/components/common/Modal/modalUtils.ts
import type { Dispatch, SetStateAction } from 'react';

// Интерфейсы
interface ModalActions {
  setTimerEnded: (setTimerEnded: Dispatch<SetStateAction<boolean>>) => void;
  setShowAnswer: (setShowAnswer: Dispatch<SetStateAction<boolean>>) => void;
  forceStop: (setTimerEnded: Dispatch<SetStateAction<boolean>>) => void;
}

// Сброс состояния модального окна (таймер и ответ)
export const resetModalState = (
  setTimerStarted: Dispatch<SetStateAction<boolean>>,
  setShowAnswer: Dispatch<SetStateAction<boolean>>,
  setTimerEnded: Dispatch<SetStateAction<boolean>>
): void => {
  setTimerStarted(false);
  setShowAnswer(false);
  setTimerEnded(false);
};

// Функции для управления состоянием внутри модального окна
export const handleModalActions: ModalActions = {
  setTimerEnded: (setTimerEnded) => {
    setTimerEnded(true);
  },
  
  setShowAnswer: (setShowAnswer) => {
    setShowAnswer(true);
  },
  
  forceStop: (setTimerEnded) => {
    setTimerEnded(true);
  },
};
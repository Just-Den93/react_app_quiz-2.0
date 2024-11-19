// Сброс состояния модального окна (таймер и ответ)
export function resetModalState(setTimerStarted, setShowAnswer, setTimerEnded) {
  setTimerStarted(false);
  setShowAnswer(false);
  setTimerEnded(false);
}

// Функции для управления состоянием внутри модального окна
export const handleModalActions = {
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

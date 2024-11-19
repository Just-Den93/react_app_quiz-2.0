// src/utils/qaModeUtils.js

// Сброс состояния при изменении блока или открытии модального окна
export function resetQAState(setForceStopped, setAnswerShown, setLocalTimerStarted) {
    setForceStopped(false);
    setAnswerShown(false);
    setLocalTimerStarted(false);
  }
  
  // Функции для управления действиями внутри QAMode
  export const handleQAActions = {
    // Запуск таймера
    startTimer: (setTimerStarted, setLocalTimerStarted) => {
      setTimerStarted(true);
      setLocalTimerStarted(true);
    },
  
    // Принудительная остановка
    forceStop: (handleForceStop, setForceStopped) => {
      handleForceStop();
      setForceStopped(true);
    },
  
    // Показ ответа
    showAnswer: (handleShowAnswer, setAnswerShown) => {
      handleShowAnswer();
      setAnswerShown(true);
    },
  };
  
// src/components/App/appUtils.ts
import { Dispatch, SetStateAction } from 'react';

export const startQuizHandler = (
  mode: number,
  uuid: string,
  setSelectedMode: Dispatch<SetStateAction<number | null>>,
  setCurrentQuizId: Dispatch<SetStateAction<string | null>>,
  setShowQuizPage: Dispatch<SetStateAction<boolean>>
): void => {
  setSelectedMode(() => mode); // Используем функцию обновления
  setCurrentQuizId(() => uuid);
  setShowQuizPage(() => true);
  localStorage.setItem('showQuizPage', 'true');
};
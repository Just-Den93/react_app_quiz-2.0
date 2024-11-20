// src/components/common/MenuModal/menuModalUtils.ts
import { QuizState } from '../../../types/quiz.types';
import { Dispatch, SetStateAction } from 'react';

export const resetQuizStateAndCloseModal = (
  currentQuizId: string | null,
  setQuizStates: Dispatch<SetStateAction<{ [key: string]: QuizState }>>,
  closeMenuModal: () => void
) => {
  if (currentQuizId) {
    localStorage.removeItem(`data-${currentQuizId}`);
    localStorage.removeItem(`usedBlocks-${currentQuizId}`);
    localStorage.removeItem('quizStates');

    setQuizStates(prev => ({
      ...prev,
      [currentQuizId]: {
        usedBlocks: {},
        data: null,
        completedGames: 0,
      },
    }));
  }
  closeMenuModal();
};
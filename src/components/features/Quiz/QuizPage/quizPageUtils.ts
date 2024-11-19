import { Category, QuizBlock, QuizState } from '../../../../types/quiz.types';
import React from 'react';

// Типы для функций-утилит
type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

// Подсчет общего количества блоков
export const getTotalBlocks = (data: Category[] | null): number => {
  return data?.reduce((acc, category) => acc + (category.blocks?.length || 0), 0) || 0;
};

// Подсчет количества использованных блоков
export const getUsedBlocksCount = (currentQuizState: QuizState): number => {
  return Object.values(currentQuizState.usedBlocks || {}).reduce(
    (acc, categoryBlocks) => acc + categoryBlocks.length,
    0
  );
};

// Обработка выбора блока
export const handleBlockSelect = (
  block: QuizBlock,
  category: Category,
  currentQuizState: QuizState,
  setSelectedBlock: SetStateAction<QuizBlock | null>,
  setSelectedCategory: SetStateAction<Category | null>,
  setIsBlockUsed: SetStateAction<boolean>
): void => {
  setSelectedBlock(block);
  setSelectedCategory(category);

  const isUsed = currentQuizState.usedBlocks?.[category.id]?.includes(block.id);
  setIsBlockUsed(!!isUsed);
};

// Обработка закрытия модального окна
export const handleCloseModal = (
  setSelectedBlock: SetStateAction<QuizBlock | null>,
  setSelectedCategory: SetStateAction<Category | null>,
  setIsBlockUsed: SetStateAction<boolean>
): void => {
  setSelectedBlock(null);
  setSelectedCategory(null);
  setIsBlockUsed(false);
};

// Обработка новой игры
export const handleNewGame = (
  currentQuizId: string,
  setQuizStates: SetStateAction<{ [key: string]: QuizState }>,
  setConfettiRunning: SetStateAction<boolean>,
  setShowEndMessage: SetStateAction<boolean>
): void => {
  setQuizStates((prevStates) => {
    const currentGameState = prevStates[currentQuizId] || {};
    const completedGames = (currentGameState.completedGames || 0) + 1;

    return {
      ...prevStates,
      [currentQuizId]: {
        ...currentGameState,
        usedBlocks: {},
        completedGames,
      },
    };
  });

  setConfettiRunning(false);
  setShowEndMessage(false);
};

// Обработка выбора категории
export const handleSelectCategory = (
  categoryId: string,
  blockId: number,
  currentQuizId: string,
  markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void,
  totalBlocks: number,
  usedBlocksCount: number,
  setConfettiRunning: SetStateAction<boolean>,
  setShowEndMessage: SetStateAction<boolean>,
  handleCloseModal: () => void
): void => {
  markBlockAsUsed(currentQuizId, categoryId, blockId);

  if (usedBlocksCount + 1 === totalBlocks) {
    setConfettiRunning(true);
    setShowEndMessage(true);
  }

  handleCloseModal();
};
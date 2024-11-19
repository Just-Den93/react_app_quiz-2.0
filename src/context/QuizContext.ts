import React, { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { QuizState, QuizContextType, Category } from '../types/quiz.types';
import { loadJsonDataByMode } from '../utils/loadJsonData';
import { safeStorage, safeJsonParse, handleError } from '../utils/errorHandling';

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: FC<QuizProviderProps> = ({ children }) => {
  // Инициализация состояния с безопасным получением данных
  const [showQuizPage, setShowQuizPage] = useState(() => {
    return safeStorage.getItem('showQuizPage') === 'true';
  });

  // Приводим selectedMode к типу number
  const [selectedMode, setSelectedMode] = useState<number | null>(() => {
    const storedMode = safeStorage.getItem('selectedMode');
    return storedMode ? Number(storedMode) : null; // Преобразуем строку в число
  });

  const [currentQuizId, setCurrentQuizId] = useState<string | null>(() => {
    return safeStorage.getItem('currentQuizId', null);
  });

  const [quizStates, setQuizStates] = useState<{ [key: string]: QuizState }>(() => {
    const savedStates = safeStorage.getItem('quizStates');
    return safeJsonParse(savedStates, {});
  });

  const [data, setData] = useState<Category[] | null>(() => {
    const savedData = safeStorage.getItem('data');
    return safeJsonParse(savedData, null);
  });

  // Безопасное обновление localStorage при изменении состояния
  useEffect(() => {
    safeStorage.setItem('showQuizPage', showQuizPage.toString());
  }, [showQuizPage]);

  useEffect(() => {
    if (selectedMode !== null) {
      safeStorage.setItem('selectedMode', selectedMode.toString()); // Преобразуем число обратно в строку
    }
  }, [selectedMode]);

  useEffect(() => {
    if (currentQuizId !== null) {
      safeStorage.setItem('currentQuizId', currentQuizId);
    }
  }, [currentQuizId]);

  // Безопасное загрузка данных викторины
  useEffect(() => {
    if (selectedMode && currentQuizId) {
      try {
        const selectedData = loadJsonDataByMode(selectedMode);
        if (selectedData?.categories) {
          setData(selectedData.categories);
          updateQuizState(currentQuizId, { data: selectedData.categories });
          safeStorage.setItem('data', JSON.stringify(selectedData.categories));
        }
      } catch (error) {
        handleError(error, 'Не удалось загрузить данные викторины.');
      }
    }
  }, [selectedMode, currentQuizId]);

  // Безопасное обновление состояния викторины
  const updateQuizState = (uuid: string, newState: Partial<QuizState>) => {
    try {
      setQuizStates((prevStates) => {
        const updatedStates = {
          ...prevStates,
          [uuid]: {
            ...prevStates[uuid],
            ...newState,
          },
        };
        safeStorage.setItem('quizStates', JSON.stringify(updatedStates));
        return updatedStates;
      });
    } catch (error) {
      handleError(error, 'Не удалось обновить состояние викторины.');
    }
  };

  // Безопасное помечание блока как использованного
  const markBlockAsUsed = (quizId: string, categoryId: string, blockId: number) => {
    try {
      if (!categoryId) {
        throw new Error('Не указана категория.');
      }

      setQuizStates((prevStates) => {
        const previousState = prevStates[quizId] || {};
        const updatedUsedBlocks = { ...previousState.usedBlocks };

        if (!updatedUsedBlocks[categoryId]) {
          updatedUsedBlocks[categoryId] = [];
        }

        if (!updatedUsedBlocks[categoryId].includes(blockId)) {
          updatedUsedBlocks[categoryId].push(blockId);
        }

        const updatedStates = {
          ...prevStates,
          [quizId]: {
            ...previousState,
            usedBlocks: updatedUsedBlocks,
          },
        };

        safeStorage.setItem('quizStates', JSON.stringify(updatedStates));
        safeStorage.setItem(`usedBlocks-${quizId}`, JSON.stringify(updatedUsedBlocks));

        return updatedStates;
      });
    } catch (error) {
      handleError(error, 'Не удалось пометить блок как использованный.');
    }
  };

  const value: QuizContextType = {
    showQuizPage,
    setShowQuizPage,
    selectedMode,
    setSelectedMode,
    currentQuizId,
    setCurrentQuizId,
    quizStates,
    setQuizStates,
    updateQuizState,
    markBlockAsUsed,
    data,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

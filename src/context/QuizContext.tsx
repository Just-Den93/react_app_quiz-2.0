// src/context/QuizContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import type { QuizState, QuizContextType, Category } from '../types/quiz.types';
import { loadJsonDataByMode } from '../utils/loadJsonData';
import { safeStorage, safeJsonParse, handleError } from '../utils/errorHandling';

// Начальное состояние для QuizState
const initialQuizState: QuizState = {
  usedBlocks: {},
  data: null,
  completedGames: 0
};

// Начальное состояние для всего хранилища состояний
const initialQuizStatesStorage: { [key: string]: QuizState } = {};

// Создаем контекст с начальным значением
const QuizContext = createContext<QuizContextType>({
  showQuizPage: false,
  setShowQuizPage: () => {},
  selectedMode: null,
  setSelectedMode: () => {},
  currentQuizId: null,
  setCurrentQuizId: () => {},
  quizStates: initialQuizStatesStorage,
  setQuizStates: () => {},
  updateQuizState: () => {},
  markBlockAsUsed: () => {},
  data: null,
});

// Хук для использования контекста
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext должен использоваться внутри QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [showQuizPage, setShowQuizPage] = useState<boolean>(() => {
    try {
      return safeStorage.getItem('showQuizPage') === 'true';
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Ошибка при инициализации showQuizPage');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Ошибка при инициализации showQuizPage');
      }
      return false;
    }
  });

  const [selectedMode, setSelectedMode] = useState<number | null>(() => {
    try {
      const storedMode = safeStorage.getItem('selectedMode');
      return storedMode ? Number(storedMode) : null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Ошибка при инициализации selectedMode');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Ошибка при инициализации selectedMode');
      }
      return null;
    }
  });

  const [currentQuizId, setCurrentQuizId] = useState<string | null>(() => {
    try {
      return safeStorage.getItem('currentQuizId') || null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Ошибка при инициализации currentQuizId');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Ошибка при инициализации currentQuizId');
      }
      return null;
    }
  });

  const [quizStates, setQuizStates] = useState<{ [key: string]: QuizState }>(() => {
    try {
      const savedStates = safeStorage.getItem('quizStates');
      if (!savedStates) return initialQuizStatesStorage;

      const parsedStates = safeJsonParse(savedStates, null);
      return parsedStates || initialQuizStatesStorage;
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Ошибка при инициализации quizStates');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Ошибка при инициализации quizStates');
      }
      return initialQuizStatesStorage;
    }
  });

  const [data, setData] = useState<Category[] | null>(() => {
    try {
      const savedData = safeStorage.getItem('data');
      return savedData ? safeJsonParse(savedData, null) : null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Ошибка при инициализации data');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Ошибка при инициализации data');
      }
      return null;
    }
  });

  // Эффекты для сохранения в localStorage...
  useEffect(() => {
    try {
      safeStorage.setItem('showQuizPage', String(showQuizPage));
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Ошибка при сохранении showQuizPage');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Ошибка при сохранении showQuizPage');
      }
    }
  }, [showQuizPage]);

  useEffect(() => {
    if (selectedMode !== null) {
      try {
        safeStorage.setItem('selectedMode', String(selectedMode));
      } catch (error: unknown) {
        if (error instanceof Error) {
          handleError(error, 'Ошибка при сохранении selectedMode');
        } else {
          handleError(new Error('Неизвестная ошибка'), 'Ошибка при сохранении selectedMode');
        }
      }
    }
  }, [selectedMode]);

  useEffect(() => {
    if (currentQuizId) {
      try {
        safeStorage.setItem('currentQuizId', currentQuizId);
      } catch (error: unknown) {
        if (error instanceof Error) {
          handleError(error, 'Ошибка при сохранении currentQuizId');
        } else {
          handleError(new Error('Неизвестная ошибка'), 'Ошибка при сохранении currentQuizId');
        }
      }
    }
  }, [currentQuizId]);

  // Эффект загрузки данных...
  useEffect(() => {
    const loadQuizData = async () => {
      if (selectedMode && currentQuizId) {
        try {
          const selectedData = loadJsonDataByMode(selectedMode);
          if (selectedData?.categories) {
            setData(selectedData.categories);
            updateQuizState(currentQuizId, { data: selectedData.categories });
            safeStorage.setItem('data', JSON.stringify(selectedData.categories));
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            handleError(error, 'Ошибка при загрузке данных викторины');
          } else {
            handleError(new Error('Неизвестная ошибка'), 'Ошибка при загрузке данных викторины');
          }
          setData(null);
        }
      }
    };

    loadQuizData();
  }, [selectedMode, currentQuizId]);

  const updateQuizState = useCallback((uuid: string, newState: Partial<QuizState>) => {
    if (!uuid) return;
    try {
      setQuizStates(prevStates => {
        const currentState = prevStates[uuid] || { ...initialQuizState };
        const updatedStates = {
          ...prevStates,
          [uuid]: {
            ...currentState,
            ...newState,
          },
        };
        safeStorage.setItem('quizStates', JSON.stringify(updatedStates));
        return updatedStates;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Ошибка при обновлении состояния викторины');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Ошибка при обновлении состояния викторины');
      }
    }
  }, []);

  const markBlockAsUsed = useCallback((quizId: string, categoryId: string, blockId: number) => {
    if (!quizId || !categoryId) return;
    try {
      setQuizStates(prevStates => {
        const currentState = prevStates[quizId] || { ...initialQuizState };
        const currentUsedBlocks = currentState.usedBlocks[categoryId] || [];
        
        const updatedStates = {
          ...prevStates,
          [quizId]: {
            ...currentState,
            usedBlocks: {
              ...currentState.usedBlocks,
              [categoryId]: [...currentUsedBlocks, blockId]
            }
          }
        };

        safeStorage.setItem('quizStates', JSON.stringify(updatedStates));
        return updatedStates;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error, 'Ошибка при пометке блока как использованного');
      } else {
        handleError(new Error('Неизвестная ошибка'), 'Ошибка при пометке блока как использованного');
      }
    }
  }, []);

  const contextValue = useMemo(() => ({
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
  }), [
    showQuizPage,
    selectedMode,
    currentQuizId,
    quizStates,
    data,
    updateQuizState,
    markBlockAsUsed
  ]);

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};

export { QuizProvider, QuizContext };
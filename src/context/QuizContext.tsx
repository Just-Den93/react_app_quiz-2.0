// src/context/QuizContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { QuizState, QuizContextType, Category } from '../types/quiz.types';
import { loadJsonDataByMode } from '../utils/loadJsonData';
import { safeStorage, safeJsonParse, handleError } from '../utils/errorHandling';

// Создаем контекст с начальным значением
const QuizContext = createContext<QuizContextType>({
	showQuizPage: false,
	setShowQuizPage: () => {},
	selectedMode: null,
	setSelectedMode: () => {},
	currentQuizId: null,
	setCurrentQuizId: () => {},
	quizStates: {},
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

// Интерфейс для пропсов провайдера
interface QuizProviderProps {
  children: ReactNode;
}

// Компонент провайдера
export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [showQuizPage, setShowQuizPage] = useState<boolean>(() => {
    try {
      return safeStorage.getItem('showQuizPage') === 'true';
    } catch (error) {
      handleError(error, 'Ошибка при инициализации showQuizPage');
      return false;
    }
  });

  const [selectedMode, setSelectedMode] = useState<number | null>(() => {
    try {
      const storedMode = safeStorage.getItem('selectedMode');
      return storedMode ? Number(storedMode) : null;
    } catch (error) {
      handleError(error, 'Ошибка при инициализации selectedMode');
      return null;
    }
  });

  const [currentQuizId, setCurrentQuizId] = useState<string | null>(() => {
    try {
      return safeStorage.getItem('currentQuizId') || null;
    } catch (error) {
      handleError(error, 'Ошибка при инициализации currentQuizId');
      return null;
    }
  });

  const [quizStates, setQuizStates] = useState<{ [key: string]: QuizState }>(() => {
	try {
	  const savedStates = safeStorage.getItem('quizStates');
	  return savedStates ? 
		 safeJsonParse(savedStates, {}) : 
		 {}; // Возвращаем пустой объект по умолчанию
	} catch (error) {
	  handleError(error, 'Ошибка при инициализации quizStates');
	  return {}; // Возвращаем пустой объект в случае ошибки
	}
 });

  const [data, setData] = useState<Category[] | null>(() => {
    try {
      const savedData = safeStorage.getItem('data');
      return savedData ? safeJsonParse(savedData, null) : null;
    } catch (error) {
      handleError(error, 'Ошибка при инициализации data');
      return null;
    }
  });

  React.useEffect(() => {
    try {
      safeStorage.setItem('showQuizPage', String(showQuizPage));
    } catch (error) {
      handleError(error, 'Ошибка при сохранении showQuizPage');
    }
  }, [showQuizPage]);

  React.useEffect(() => {
    if (selectedMode !== null) {
      try {
        safeStorage.setItem('selectedMode', String(selectedMode));
      } catch (error) {
        handleError(error, 'Ошибка при сохранении selectedMode');
      }
    }
  }, [selectedMode]);

  React.useEffect(() => {
    if (currentQuizId) {
      try {
        safeStorage.setItem('currentQuizId', currentQuizId);
      } catch (error) {
        handleError(error, 'Ошибка при сохранении currentQuizId');
      }
    }
  }, [currentQuizId]);

  React.useEffect(() => {
    const loadQuizData = async () => {
      if (selectedMode && currentQuizId) {
        try {
          const selectedData = loadJsonDataByMode(selectedMode);
          if (selectedData?.categories) {
            setData(selectedData.categories);
            updateQuizState(currentQuizId, { data: selectedData.categories });
            safeStorage.setItem('data', JSON.stringify(selectedData.categories));
          }
        } catch (error) {
          handleError(error, 'Ошибка при загрузке данных викторины');
          setData(null);
        }
      }
    };

    loadQuizData();
  }, [selectedMode, currentQuizId]);

  const updateQuizState = React.useCallback((uuid: string, newState: Partial<QuizState>) => {
    if (!uuid) return;
    try {
      setQuizStates(prevStates => {
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
      handleError(error, 'Ошибка при обновлении состояния викторины');
    }
  }, []);

  const markBlockAsUsed = React.useCallback((quizId: string, categoryId: string, blockId: number) => {
    if (!quizId || !categoryId) return;
    try {
      setQuizStates(prevStates => {
        const previousState = prevStates[quizId] || { usedBlocks: {} };
        const updatedUsedBlocks = {
          ...previousState.usedBlocks,
          [categoryId]: [...(previousState.usedBlocks[categoryId] || []), blockId]
        };

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
      handleError(error, 'Ошибка при пометке блока как использованного');
    }
  }, []);

  const contextValue = React.useMemo(() => ({
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

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
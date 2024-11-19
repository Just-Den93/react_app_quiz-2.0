import React, { createContext, useContext, useState } from 'react';
import { QuizState, Category } from '../types/quiz.types';
import { safeStorage, safeJsonParse } from '../utils/errorHandling';

interface QuizContextType {
  showQuizPage: boolean;
  setShowQuizPage: (show: boolean) => void;
  selectedMode: number | null;
  setSelectedMode: (mode: number | null) => void;
  currentQuizId: string | null;
  setCurrentQuizId: (id: string | null) => void;
  quizStates: {
    [key: string]: QuizState;
  };
  data: Category[] | null;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [showQuizPage, setShowQuizPage] = useState(() => 
    safeStorage.getItem('showQuizPage') === 'true'
  );

  const [selectedMode, setSelectedMode] = useState<number | null>(() => {
    const mode = safeStorage.getItem('selectedMode');
    return mode ? Number(mode) : null;
  });

  const [currentQuizId, setCurrentQuizId] = useState<string | null>(() => 
    safeStorage.getItem('currentQuizId')
  );

  const [quizStates, setQuizStates] = useState<{ [key: string]: QuizState }>(() => {
    const savedStates = safeStorage.getItem('quizStates');
    return safeJsonParse(savedStates, {});
  });

  const [data, setData] = useState<Category[] | null>(null);

  const value = {
    showQuizPage,
    setShowQuizPage,
    selectedMode,
    setSelectedMode,
    currentQuizId,
    setCurrentQuizId,
    quizStates,
    data
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}
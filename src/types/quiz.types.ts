  // src/types/quiz.types.ts
  import type { Dispatch, SetStateAction } from 'react';

  export interface QuizBlock {
    id: number;
    question: string;
    options?: string[];
    text: string;
    categoryId?: string;
    'correct answer'?: string;
  }


export interface QuizData {
  uuid: string;
  mode: number;
  name?: string;
  "quiz name"?: string;
  categories: any[];
  filename?: string;
}

  export interface Category {
    id: string;
    name: string;
    blocks: QuizBlock[];
  }

  export interface QuizState {
    usedBlocks: { [key: string]: number[] };
    data: Category[] | null;
    completedGames: number;
  }

  export interface QuizContextType {
    showQuizPage: boolean;
    setShowQuizPage: React.Dispatch<React.SetStateAction<boolean>>;
    selectedMode: number | null;
    setSelectedMode: React.Dispatch<React.SetStateAction<number | null>>;
    currentQuizId: string | null;
    setCurrentQuizId: React.Dispatch<React.SetStateAction<string | null>>;
    quizStates: { [key: string]: QuizState };
    setQuizStates: React.Dispatch<React.SetStateAction<{ [key: string]: QuizState }>>;
    updateQuizState: (uuid: string, newState: Partial<QuizState>) => void;
    markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void;
    data: Category[] | null;
  }
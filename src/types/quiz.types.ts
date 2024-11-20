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
  setShowQuizPage: Dispatch<SetStateAction<boolean>>;
  selectedMode: number | null;
  setSelectedMode: Dispatch<SetStateAction<number | null>>;
  currentQuizId: string | null;
  setCurrentQuizId: Dispatch<SetStateAction<string | null>>;
  quizStates: { [key: string]: QuizState };
  setQuizStates: Dispatch<SetStateAction<{ [key: string]: QuizState }>>;
  updateQuizState: (uuid: string, newState: Partial<QuizState>) => void;
  markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void;
  data: Category[] | null;
}
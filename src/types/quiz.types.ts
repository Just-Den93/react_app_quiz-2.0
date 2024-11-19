import { Dispatch, SetStateAction } from 'react';

// Интерфейс для блока викторины
export interface QuizBlock {
  id: number;
  question: string;
  options?: string[];
  text: string;
  categoryId?: string;
  'correct answer'?: string;
}

// Интерфейс для категории в викторине
export interface Category {
  id: string;
  name: string;
  blocks: QuizBlock[]; // Блоки в категории
}

// Интерфейс для состояния викторины
export interface QuizState {
  usedBlocks: { [key: string]: number[] }; // Использованные блоки (по категориям)
  data: Category[] | null; // Данные категорий или null, если нет данных
  completedGames?: number; // Количество завершённых игр (необязательное поле)
}

// Интерфейс для пропсов компонента CategoryRow
export interface CategoryRowProps {
  category: Category;
  onBlockSelect: (blockData: QuizBlock, category: Category) => void;
  usedBlocks: { [categoryId: string]: number[] }; // Использованные блоки для каждой категории
}

// Функция обработки выбора блока
export const handleBlockSelection = (
  blockData: QuizBlock,
  category: Category,
  onBlockSelect: (blockData: QuizBlock, category: Category) => void
): void => {
  onBlockSelect(blockData, category); // Передаем данные блока и категорию в функцию обратного вызова
}

// Тип для контекста викторины
export interface QuizContextType {
  showQuizPage: boolean;
  setShowQuizPage: Dispatch<SetStateAction<boolean>>;
  selectedMode: number | null;
  setSelectedMode: Dispatch<SetStateAction<number | null>>;
  currentQuizId: string | null;
  setCurrentQuizId: Dispatch<SetStateAction<string | null>>;
  quizStates: { [key: string]: QuizState };
  setQuizStates: Dispatch<SetStateAction<{ [key: string]: QuizState }>>;
  markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void;
  updateQuizState: (uuid: string, newState: Partial<QuizState>) => void;
  data: Category[] | null; // Данные категорий для викторины
}

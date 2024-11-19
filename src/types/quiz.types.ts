// Типы для блока вопроса
export interface QuizBlock {
    id: number;
    question: string;
    options?: string[];
    'correct answer'?: string;
    text: string;
    categoryId?: string;
  }
  
  // Типы для категории
  export interface Category {
    id: string;
    name: string;
    blocks: QuizBlock[];
  }
  
  // Типы для данных викторины
  export interface QuizData {
    uuid: string;
    mode: number;
    'quiz name': string;
    categories: Category[];
  }
  
  // Типы для состояния игры
  export interface QuizState {
    usedBlocks: {
      [key: string]: number[];
    };
    data: Category[] | null;
    completedGames?: number;
  }
  
  // Типы для контекста
  export interface QuizContextType {
    showQuizPage: boolean;
    setShowQuizPage: (show: boolean) => void;
    selectedMode: number | null;
    setSelectedMode: (mode: number | null) => void;
    currentQuizId: string | null;
    setCurrentQuizId: (id: string | null) => void;
    quizStates: {
      [key: string]: QuizState;
    };
    setQuizStates: React.Dispatch<React.SetStateAction<{
      [key: string]: QuizState;
    }>>;
    updateQuizState: (uuid: string, newState: Partial<QuizState>) => void;
    markBlockAsUsed: (quizId: string, categoryId: string, blockId: number) => void;
    data: Category[] | null;
  }
  
  // Типы для компонентов
  export interface QuizCardProps {
    startQuiz: () => void;
    mode: number;
    name: string;
    categories: Category[];
    uuid: string;
  }
  
  export interface TimerProps {
    duration: number;
    onEnd: () => void;
    onForceStop: () => void;
  }
  
  export interface ModalProps {
    block: QuizBlock | null;
    categoryName: string;
    onClose: () => void;
    selectedMode: number;
    onSelectCategory: (categoryId: string, blockId: number) => void;
    isBlockUsed: boolean;
    onTryAgain: () => void;
    onContinue: () => void;
  }
  
  // Типы для утилит
  export interface SafeStorage {
    setItem: (key: string, value: string) => void;
    getItem: (key: string, defaultValue?: any) => string | null;
    removeItem: (key: string) => void;
  }
  
  // Типы для обработки ошибок
  export interface ErrorMessages {
    QUOTA_EXCEEDED_ERR: string;
    STORAGE_ERROR: string;
    DATA_LOAD_ERROR: string;
    JSON_PARSE_ERROR: string;
    MODAL_ERROR: string;
    ANIMATION_ERROR: string;
    DEFAULT: string;
    [key: string]: string;
  }
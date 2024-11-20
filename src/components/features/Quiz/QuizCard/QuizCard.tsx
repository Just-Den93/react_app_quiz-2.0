// src/components/features/Quiz/QuizCard/QuizCard.tsx
import React from 'react';
import { useQuizContext } from '../../../../context/QuizContext';
import styles from './QuizCard.module.css';
import { Category } from '../../../../types/quiz.types';

interface QuizCardProps {
  startQuiz: () => void;
  mode: number;
  name: string;
  categories: Category[];
  uuid: string;
}

const QuizCard: React.FC<QuizCardProps> = ({
  startQuiz,
  mode,
  name,
  categories,
  uuid
}) => {
  console.log('QuizCard rendered with uuid:', uuid); // Добавляем логирование

  const context = useQuizContext();
  
  console.log('Context received:', context); // Логируем весь контекст

  // Проверяем, что контекст существует и содержит quizStates
  if (!context || !context.quizStates) {
    console.error('Context or quizStates is missing');
    return null;
  }

  const { quizStates, setQuizStates } = context;

  console.log('Current quizStates:', quizStates); // Логируем состояние

  // Инициализация состояния
  React.useEffect(() => {
    if (!uuid) {
      console.error('UUID is missing');
      return;
    }

    if (!quizStates[uuid]) {
      console.log('Initializing state for uuid:', uuid); // Логируем инициализацию
      setQuizStates(prev => ({
        ...prev,
        [uuid]: {
          usedBlocks: {},
          completedGames: 0,
          data: null
        }
      }));
    }
  }, [uuid, quizStates, setQuizStates]);

  // Безопасное получение состояния викторины с проверками
  const getCurrentQuizState = React.useCallback(() => {
    if (!uuid) {
      console.error('UUID is missing in getCurrentQuizState');
      return { usedBlocks: {}, completedGames: 0, data: null };
    }
    if (!quizStates) {
      console.error('quizStates is missing in getCurrentQuizState');
      return { usedBlocks: {}, completedGames: 0, data: null };
    }
    return quizStates[uuid] || { usedBlocks: {}, completedGames: 0, data: null };
  }, [uuid, quizStates]);

  const currentQuizState = getCurrentQuizState();

  // Безопасный подсчет вопросов с проверками
  const getTotalQuestions = React.useCallback(() => {
    if (!categories) {
      console.error('Categories is missing');
      return 0;
    }
    if (!Array.isArray(categories)) {
      console.error('Categories is not an array');
      return 0;
    }
    return categories.reduce((acc, category) => {
      if (!category) return acc;
      if (!category.blocks) return acc;
      if (!Array.isArray(category.blocks)) return acc;
      return acc + category.blocks.length;
    }, 0);
  }, [categories]);

  const totalQuestions = getTotalQuestions();

  // Если что-то из критически важных данных отсутствует, показываем сообщение об ошибке
  if (!uuid || !quizStates) {
    console.error('Critical data missing:', { uuid, quizStates: !!quizStates });
    return (
      <div className={styles.error}>
        Ошибка загрузки данных викторины
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <div className={styles.questionCount}>
          {totalQuestions} {totalQuestions === 1 ? 'вопрос' : 'вопросов'}
        </div>
        <h2>{name || 'Без названия'}</h2>
        <div className={styles.bottomRow}>
          <button
            className={styles.startButton}
            onClick={startQuiz}
            disabled={!categories || categories.length === 0}
          >
            Провести наживо
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuizCard);
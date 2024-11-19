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
  const { quizStates } = useQuizContext();

  // Отримуємо поточний стан вікторини для конкретного uuid
  const currentQuizState = quizStates[uuid] || {};
  const completedGames = currentQuizState.completedGames || 0;

  // Підрахунок загальної кількості питань
  const totalQuestions = categories && Array.isArray(categories)
    ? categories.reduce((acc, category) => acc + (category.blocks?.length || 0), 0)
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <div className={styles.questionCount}>{totalQuestions} запитань</div>
        <h2>{name}</h2>
        <div className={styles.bottomRow}>
          <button className={styles.startButton} onClick={startQuiz}>
            Провести наживо
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
import React from 'react';
import PropTypes from 'prop-types';
import { useQuizContext } from '../../../../context/QuizContext';
import styles from './QuizCard.module.css';
import quizImage from '../../../../assets/images/quizpng.png';
import { ReactComponent as PCImage } from '../../../../assets/images/PC_horizontal_1line_color.svg';

function QuizCard({ startQuiz, mode, name, categories, uuid }) {
  const { quizStates } = useQuizContext();

  // Получаем текущее состояние викторины для конкретного uuid
  const currentQuizState = quizStates[uuid] || {};
  const completedGames = currentQuizState.completedGames || 0;

  // Подсчет общего количества вопросов
  const totalQuestions = categories && Array.isArray(categories)
    ? categories.reduce((acc, category) => acc + (category.blocks?.length || 0), 0)
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {/* <img src={quizImage} alt="Quiz Image" className={styles.imageContent} /> */}
        <div className={styles.questionCount}>{totalQuestions} запитань</div>
      {/* </div>
      <div className={styles.details}> */}
        <h2>{name}</h2>
        <div className={styles.bottomRow}>
          {/* <PCImage className={styles.affiliationIcon} /> */}
          {/* <p className={styles.games}>Ігри: {completedGames}</p> */}
          <button className={styles.startButton} onClick={startQuiz}>
            Провести наживо
          </button>
        </div>
      </div>
    </div>
  );
}

QuizCard.propTypes = {
  startQuiz: PropTypes.func.isRequired,
  mode: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired, // Проп для всех категорий
  uuid: PropTypes.string.isRequired, // uuid для уникальной идентификации викторины
};

export default QuizCard;

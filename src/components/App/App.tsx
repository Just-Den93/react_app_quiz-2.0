import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from '../features/Quiz/QuizPage/QuizPage';
import QuizCard from '../features/Quiz/QuizCard/QuizCard';
import Sidebar from '../layout/Sidebar/Sidebar';
import styles from './App.module.css';
import { useQuizContext } from '../../context/QuizContext';
import { loadUniqueUuids } from '../../utils/loadJsonData';
import { startQuizHandler } from './appUtils';
import type { QuizData } from '../../types/quiz.types';

const App: React.FC = () => {
  // Доступ к данным контекста
  const { showQuizPage, setShowQuizPage, setSelectedMode, setCurrentQuizId } = useQuizContext();
  
  // Состояние для данных викторины
  const [quizData, setQuizData] = useState<QuizData[]>([]);

  // Загрузка данных викторины при монтировании компонента
  useEffect(() => {
    const uniqueData = loadUniqueUuids();
    setQuizData(uniqueData); // Установка загруженных данных
  }, []);

  // Рендеринг компонента
  return (
    <Router>
      <div className={styles.container}>
        {quizData.length === 0 ? (
          <h1>Loading...</h1> // Отображение загрузки, если данных еще нет
        ) : (
          <>
            {/* Отображение Sidebar, если не открыта страница викторины */}
            {!showQuizPage && <Sidebar />}
            <div className={styles.content_wraper}>
              <div className={showQuizPage ? styles.hidden : styles.content}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      !showQuizPage ? (
                        <div className={styles.quizCardsContainer}>
                          {quizData.map((data) => (
                            <QuizCard
                              key={data.uuid}
                              startQuiz={() =>
                                startQuizHandler(
                                  data.mode,
                                  data.uuid,
                                  setSelectedMode,
                                  setCurrentQuizId,
                                  setShowQuizPage
                                )
                              }
                              mode={data.mode}
                              uuid={data.uuid}
                              name={data.name || 'Untitled Quiz'} // Указание значения по умолчанию
                              categories={data.categories}
                            />
                          ))}
                        </div>
                      ) : null
                    }
                  />
                </Routes>
              </div>
            </div>
            {/* Отображение страницы викторины, если она активна */}
            {showQuizPage && (
              <div className={styles.fullscreen}>
                <QuizPage />
              </div>
            )}
          </>
        )}
      </div>
    </Router>
  );
};

export default App;

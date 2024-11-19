import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadJsonDataByMode } from '../utils/loadJsonData';

const GameStateContext = createContext();

export function useGameState() {
  return useContext(GameStateContext);
}

export function GameStateProvider({ children }) {
  const [showQuizPage, setShowQuizPage] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Состояние для видимости меню
  const [currentQuizId, setCurrentQuizId] = useState(() => localStorage.getItem('currentQuizId'));
  const [quizStates, setQuizStates] = useState(() => {
    const savedStates = localStorage.getItem('quizStates');
    return savedStates ? JSON.parse(savedStates) : {};
  });
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('data');
    return savedData ? JSON.parse(savedData) : null;
  });
  const [completedGames, setCompletedGames] = useState(() => {
    const savedGames = localStorage.getItem('completedGames');
    return savedGames ? JSON.parse(savedGames) : 0;
  });

  useEffect(() => {
    if (currentQuizId) {
      const selectedData = loadJsonDataByMode(currentQuizId);
      const savedData = localStorage.getItem('data');
      if (selectedData && JSON.stringify(selectedData) !== savedData) {
        setData(selectedData);
        localStorage.setItem('data', JSON.stringify(selectedData));
      }
    }
  }, [currentQuizId]);

  // Функция для закрытия меню
  const closeMenuModal = () => setIsMenuVisible(false);

  // Функция для открытия меню
  const showMenuModal = () => setIsMenuVisible(true);

  // Обработка нажатия клавиши "Escape"
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMenuVisible) {
        closeMenuModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuVisible]);

  return (
    <GameStateContext.Provider
      value={{
        showQuizPage,
        setShowQuizPage,
        currentQuizId,
        setCurrentQuizId,
        quizStates,
        setQuizStates,
        data,
        completedGames,
        isMenuVisible,
        closeMenuModal,
        showMenuModal, // Экспортируем функции работы с меню
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

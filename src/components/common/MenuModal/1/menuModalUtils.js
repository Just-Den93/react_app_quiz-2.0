import { useState, useCallback, useEffect } from 'react';

// Логика отображения/закрытия меню
export function useMenuModal() {
  const [isVisible, setIsVisible] = useState(false);

  const showMenuModal = () => {
    setIsVisible(true);
  };

  const closeMenuModal = () => {
    setIsVisible(false);
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      if (isVisible) {
        closeMenuModal();
      } else {
        showMenuModal();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    isVisible,
    showMenuModal,
    closeMenuModal,
  };
}

// Вынесенная функция для сброса состояния и закрытия модального окна
export function resetQuizStateAndCloseModal(currentQuizId, setQuizStates, closeMenuModal) {
  // Очищаем все данные текущей викторины в localStorage
  localStorage.removeItem(`data-${currentQuizId}`);
  localStorage.removeItem(`usedBlocks-${currentQuizId}`);
  localStorage.removeItem('quizStates');  // Очищаем состояние викторины в localStorage

  // Сбрасываем состояние викторины в контексте приложения
  setQuizStates((prevStates) => ({
    ...prevStates,
    [currentQuizId]: {
      usedBlocks: {},
      data: null,
    },
  }));

  // Закрываем меню
  closeMenuModal();
}

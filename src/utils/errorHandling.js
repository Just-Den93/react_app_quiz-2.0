// Централізована обробка помилок
export const handleError = (error, customMessage) => {
  const errorMessages = {
    // localStorage помилки
    QUOTA_EXCEEDED_ERR: 'Не вдалося зберегти дані. Сховище браузера переповнене.',
    STORAGE_ERROR: 'Помилка при роботі з локальним сховищем браузера.',
    
    // Помилки завантаження даних
    DATA_LOAD_ERROR: 'Не вдалося завантажити дані вікторини.',
    JSON_PARSE_ERROR: 'Помилка при обробці даних.',
    
    // DOM помилки
    MODAL_ERROR: 'Помилка при роботі з модальним вікном.',
    
    // Анімації
    ANIMATION_ERROR: 'Не вдалося запустити анімацію.',
    
    // Загальні помилки
    DEFAULT: 'Сталася непередбачена помилка.'
  };

  const message = customMessage || errorMessages[error.name] || errorMessages.DEFAULT;
  alert(message);
  
  // Можна додати логування помилок для розробки
  if (process.env.NODE_ENV === 'development') {
    console.error('Error details:', error);
  }
};

// Безпечна робота з localStorage
export const safeStorage = {
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      handleError(error, 'Не вдалося зберегти прогрес гри.');
    }
  },
  
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : defaultValue;
    } catch (error) {
      handleError(error, 'Не вдалося завантажити збережений прогрес.');
      return defaultValue;
    }
  },
  
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      handleError(error, 'Не вдалося видалити збережені дані.');
    }
  }
};

// Безпечне перетворення JSON
export const safeJsonParse = (jsonString, defaultValue = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    handleError(error, 'Помилка при обробці даних гри.');
    return defaultValue;
  }
};

// Безпечне завантаження даних вікторини
export const safeLoadQuizData = () => {
  try {
    const context = require.context('../data', false, /\.json$/);
    return context.keys().map(key => ({
      ...context(key),
      filename: key,
    }));
  } catch (error) {
    handleError(error, 'Не вдалося завантажити дані вікторини.');
    return [];
  }
};

// Безпечна робота з DOM елементами
export const safeDomOperations = {
  toggleModal(modalId, isVisible) {
    try {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = isVisible ? 'flex' : 'none';
      }
    } catch (error) {
      handleError(error, 'Помилка при роботі з модальним вікном.');
    }
  },

  getElement(id) {
    try {
      return document.getElementById(id);
    } catch (error) {
      handleError(error, 'Помилка при роботі з елементом сторінки.');
      return null;
    }
  }
};
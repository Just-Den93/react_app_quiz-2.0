import { handleError } from './errorHandling';

export function loadJsonDataFiles() {
  try {
    const context = require.context('../data', false, /\.json$/);
    return context.keys().map(key => ({
      ...context(key),
      filename: key,
    }));
  } catch (error) {
    handleError(error, 'Не вдалося завантажити файли вікторини.');
    return [];
  }
}

export function loadUniqueUuids() {
  try {
    const dataFiles = loadJsonDataFiles();
    const uniqueUuids = Array.from(new Set(dataFiles.map(file => file.uuid)));

    return uniqueUuids.map(uuid => {
      const quizData = dataFiles.find(file => file.uuid === uuid);
      if (!quizData) {
        throw new Error('Не знайдено дані вікторини');
      }
      return {
        uuid: quizData.uuid,
        mode: quizData.mode,
        name: quizData["quiz name"],
        categories: quizData.categories,
      };
    });
  } catch (error) {
    handleError(error, 'Помилка при обробці даних вікторини.');
    return [];
  }
}

export function loadJsonDataByMode(mode) {
  try {
    const dataFiles = loadJsonDataFiles();
    const modeData = dataFiles.find(file => file.mode === mode);
    
    if (!modeData) {
      throw new Error('Не знайдено вікторину для вказаного режиму');
    }
    
    return modeData;
  } catch (error) {
    handleError(error, 'Не вдалося завантажити дані для вибраного режиму гри.');
    return null;
  }
}

export function loadJsonFileCount() {
  try {
    const context = require.context('../data', false, /\.json$/);
    return context.keys().length;
  } catch (error) {
    handleError(error, 'Не вдалося підрахувати кількість файлів вікторини.');
    return 0;
  }
}
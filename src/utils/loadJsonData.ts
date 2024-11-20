import { handleError } from './errorHandling';
import { Category } from '../types/quiz.types';

interface QuizData {
  uuid: string;
  mode: number;
  name: string;
  categories: Category[];
}

export function loadJsonDataFiles(): QuizData[] {
  try {
    const context = require.context('../data', false, /\.json$/);
    const files = context.keys();
    console.log('Found JSON files:', files);

    return files.map(key => {
      const data = context(key);
      return {
        ...data,
        name: data["quiz name"] || 'Unnamed Quiz',
        filename: key
      };
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error loading JSON files:', error);
      handleError(error, 'Не вдалося завантажити файли вікторини.');
    } else {
      handleError(new Error('Неизвестная ошибка'), 'Не вдалося завантажити файли вікторини.');
    }
    return [];
  }
}

export function loadUniqueUuids(): QuizData[] {
  try {
    const dataFiles = loadJsonDataFiles();
    console.log('All loaded data files:', dataFiles);
    
    if (dataFiles.length === 0) {
      console.warn('No quiz files found');
      return [];
    }

    const uniqueUuids = Array.from(new Set(dataFiles.map(file => file.uuid)));
    console.log('Found unique UUIDs:', uniqueUuids);

    const uniqueQuizzes = uniqueUuids.map(uuid => {
      const quizData = dataFiles.find(file => file.uuid === uuid);
      if (!quizData) {
        throw new Error(`Quiz data not found for UUID: ${uuid}`);
      }
      return {
        uuid: quizData.uuid,
        mode: quizData.mode,
        name: quizData.name,
        categories: quizData.categories || []
      };
    });

    console.log('Processed unique quizzes:', uniqueQuizzes);
    return uniqueQuizzes;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error processing unique UUIDs:', error);
      handleError(error, 'Помилка при обробці даних вікторини.');
    } else {
      handleError(new Error('Неизвестная ошибка'), 'Помилка при обробці даних вікторини.');
    }
    return [];
  }
}

export function loadJsonDataByMode(mode: number): QuizData | null {
  try {
    console.log('Loading quiz data for mode:', mode);
    
    const dataFiles = loadJsonDataFiles();
    if (dataFiles.length === 0) {
      console.warn('No quiz files found when searching by mode');
      return null;
    }

    const modeData = dataFiles.find(file => file.mode === mode);
    
    if (!modeData) {
      console.warn(`No quiz found for mode: ${mode}`);
      return null;
    }
    
    console.log('Found quiz data for mode:', modeData);
    return {
      uuid: modeData.uuid,
      mode: modeData.mode,
      name: modeData.name,
      categories: modeData.categories || []
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error loading quiz by mode:', error);
      handleError(error, 'Не вдалося завантажити дані для вибраного режиму гри.');
    } else {
      handleError(new Error('Неизвестная ошибка'), 'Не вдалося завантажити дані для вибраного режиму гри.');
    }
    return null;
  }
}

export function loadJsonFileCount(): number {
  try {
    const context = require.context('../data', false, /\.json$/);
    const count = context.keys().length;
    console.log('Total quiz files found:', count);
    return count;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error counting quiz files:', error);
      handleError(error, 'Не вдалося підрахувати кількість файлів вікторини.');
    } else {
      handleError(new Error('Неизвестная ошибка'), 'Не вдалося підрахувати кількість файлів вікторини.');
    }
    return 0;
  }
}
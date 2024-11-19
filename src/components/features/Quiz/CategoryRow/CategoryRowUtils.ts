import { QuizBlock, Category } from '../../../../types/quiz.types'; // Импортируем типы из вашего файла типов

// Функция для обработки выбора блока и категории
export function handleBlockSelection(
  blockData: QuizBlock, // Блок викторины
  category: Category, // Категория викторины
  onBlockSelect: (blockData: QuizBlock, category: Category) => void // Колбэк-функция
): void {
  onBlockSelect(blockData, category); // Передаем данные блока и категорию в функцию обратного вызова
}

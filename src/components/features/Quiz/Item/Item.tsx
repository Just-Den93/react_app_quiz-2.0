import React from 'react';
import styles from './Item.module.css';
import { QuizBlock } from '../../../../types/quiz.types';
import { useQuizContext } from '../../../../context/QuizContext';
import { checkIfUsed, handleBlockClick } from './itemUtils';

interface ItemProps {
  block: QuizBlock;
  categoryId: string;
  onBlockSelect: (block: QuizBlock & { categoryId: string }) => void;
  isUsed: boolean;  // Объявляем проп isUsed
}

const Item: React.FC<ItemProps> = ({ block, categoryId, onBlockSelect, isUsed }) => {
  const { quizStates, currentQuizId } = useQuizContext();
  const isBlockUsed = checkIfUsed(quizStates, currentQuizId, categoryId, block.id); // Используем вынесенную функцию

  return (
    <button
      className={`${styles.box} ${isBlockUsed || isUsed ? styles.used : ''}`}
      onClick={() => handleBlockClick(block, categoryId, onBlockSelect)} // Используем вынесенную функцию
    >
      {block.id + 1}
    </button>
  );
};

export default Item;

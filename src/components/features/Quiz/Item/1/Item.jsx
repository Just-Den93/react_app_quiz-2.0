// import React from 'react';
// import styles from './Item.module.css';
// import { useQuizContext } from '../../../../../context/QuizContext';
// import { checkIfUsed, handleBlockClick } from '../itemUtils';

// function Item({ block, categoryId, onBlockSelect }) {
//   const { quizStates, currentQuizId } = useQuizContext();
//   const isUsed = checkIfUsed(quizStates, currentQuizId, categoryId, block.id); // Используем вынесенную функцию

//   return (
//     <button
//       className={`${styles.box} ${isUsed ? styles.used : ''}`}
//       onClick={() => handleBlockClick(block, categoryId, onBlockSelect)} // Используем вынесенную функцию
//     >
//       {block.id + 1}
//     </button>
//   );
// }

// export default Item;

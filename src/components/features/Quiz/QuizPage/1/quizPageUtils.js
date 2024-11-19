// // Подсчет общего количества блоков
// export const getTotalBlocks = (data) => {
//   const totalBlocks = data?.reduce((acc, category) => acc + (category.blocks?.length || 0), 0) || 0;
//   console.log('Total blocks:', totalBlocks);
//   return totalBlocks;
// };

// // Подсчет количества использованных блоков
// export const getUsedBlocksCount = (currentQuizState) => {
//   const usedBlocksCount = Object.values(currentQuizState.usedBlocks || {}).reduce(
//     (acc, categoryBlocks) => acc + categoryBlocks.length,
//     0
//   );
//   console.log('Used blocks count:', usedBlocksCount);
//   return usedBlocksCount;
// };

// // Обработка выбора блока
// export const handleBlockSelect = (
//   block, category, currentQuizState, setSelectedBlock, setSelectedCategory, setIsBlockUsed
// ) => {
//   setSelectedBlock(block);
//   setSelectedCategory(category);

//   if (currentQuizState.usedBlocks?.[category.id]?.includes(block.id)) {
//     setIsBlockUsed(true);
//   } else {
//     setIsBlockUsed(false);
//   }
// };

// // Обработка закрытия модального окна
// export const handleCloseModal = (setSelectedBlock, setSelectedCategory, setIsBlockUsed) => {
//   setSelectedBlock(null);
//   setSelectedCategory(null);
//   setIsBlockUsed(false);
// };

// // Обработка завершения игры
// export const handleNewGame = (currentQuizId, setQuizStates, setConfettiRunning, setShowEndMessage) => {
//   console.log('Starting new game for quiz:', currentQuizId);

//   setQuizStates((prevStates) => {
//     const currentGameState = prevStates[currentQuizId] || {};
//     const completedGames = (currentGameState.completedGames || 0) + 1;

//     // Сохраняем количество завершенных игр в localStorage
//     const updatedState = {
//       ...prevStates,
//       [currentQuizId]: {
//         ...currentGameState,
//         usedBlocks: {}, // Обнуляем использованные блоки
//         completedGames, // Обновляем количество завершенных игр
//       },
//     };
//     localStorage.setItem('quizStates', JSON.stringify(updatedState));
//     return updatedState;
//   });

//   setConfettiRunning(false);
//   setShowEndMessage(false);
// };

// // Обработка возврата в главное меню
// export const handleMainMenu = (
//   currentQuizId, setQuizStates, setShowQuizPage, setConfettiRunning, clearState = false
// ) => {
//   console.log('Returning to main menu, clearing state:', clearState);

//   if (clearState) {
//     setQuizStates((prevStates) => {
//       const currentGameState = prevStates[currentQuizId] || {};

//       // Очищаем только использованные блоки, оставляем завершенные игры
//       const updatedState = {
//         ...prevStates,
//         [currentQuizId]: {
//           ...currentGameState,
//           usedBlocks: {}, // Очищаем только использованные блоки
//           completedGames: currentGameState.completedGames, // Сохраняем завершенные игры
//         },
//       };

//       // Обновляем данные в localStorage
//       localStorage.setItem('quizStates', JSON.stringify(updatedState));
//       return updatedState;
//     });
//   }

//   setShowQuizPage(false);
//   setConfettiRunning(false);
// };

// // Обработка выбора категории и запуска конфетти
// export const handleSelectCategory = (
//   categoryId, blockId, currentQuizId, markBlockAsUsed, totalBlocks, usedBlocksCount, setConfettiRunning, setShowEndMessage, handleCloseModal
// ) => {
//   markBlockAsUsed(currentQuizId, categoryId, blockId);

//   if (usedBlocksCount + 1 === totalBlocks) {
//     setConfettiRunning(true);
//     setShowEndMessage(true);
//   }

//   handleCloseModal();
// };

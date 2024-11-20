// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { loadJsonDataByMode } from '../utils/loadJsonData';
// import { safeStorage, safeJsonParse, handleError } from '../utils/errorHandling';

// const QuizContext = createContext();

// export function useQuizContext() {
//   return useContext(QuizContext);
// }

// export function QuizProvider({ children }) {
//   // Ініціалізація стану з безпечним отриманням даних
//   const [showQuizPage, setShowQuizPage] = useState(() => {
//     return safeStorage.getItem('showQuizPage') === 'true';
//   });

//   const [selectedMode, setSelectedMode] = useState(() => {
//     return safeStorage.getItem('selectedMode', null);
//   });

//   const [currentQuizId, setCurrentQuizId] = useState(() => {
//     return safeStorage.getItem('currentQuizId', null);
//   });

//   const [quizStates, setQuizStates] = useState(() => {
//     const savedStates = safeStorage.getItem('quizStates');
//     return safeJsonParse(savedStates, {});
//   });

//   const [data, setData] = useState(() => {
//     const savedData = safeStorage.getItem('data');
//     return safeJsonParse(savedData, null);
//   });

//   // Безпечне оновлення localStorage при зміні стану
//   useEffect(() => {
//     safeStorage.setItem('showQuizPage', showQuizPage.toString());
//   }, [showQuizPage]);

//   useEffect(() => {
//     if (selectedMode !== null) {
//       safeStorage.setItem('selectedMode', selectedMode);
//     }
//   }, [selectedMode]);

//   useEffect(() => {
//     if (currentQuizId !== null) {
//       safeStorage.setItem('currentQuizId', currentQuizId);
//     }
//   }, [currentQuizId]);

//   // Безпечне завантаження даних вікторини
//   useEffect(() => {
//     if (selectedMode && currentQuizId) {
//       try {
//         const selectedData = loadJsonDataByMode(selectedMode);
//         if (selectedData?.categories) {
//           setData(selectedData.categories);
//           updateQuizState(currentQuizId, { data: selectedData.categories });
//           safeStorage.setItem('data', JSON.stringify(selectedData.categories));
//         }
//       } catch (error) {
//         handleError(error, 'Не вдалося завантажити дані вікторини.');
//       }
//     }
//   }, [selectedMode, currentQuizId]);

//   // Безпечне оновлення стану вікторини
//   const updateQuizState = (uuid, newState) => {
//     try {
//       setQuizStates((prevStates) => {
//         const updatedStates = {
//           ...prevStates,
//           [uuid]: {
//             ...prevStates[uuid],
//             ...newState,
//           },
//         };
//         safeStorage.setItem('quizStates', JSON.stringify(updatedStates));
//         return updatedStates;
//       });
//     } catch (error) {
//       handleError(error, 'Не вдалося оновити стан вікторини.');
//     }
//   };

//   // Безпечне позначення блоку як використаного
//   const markBlockAsUsed = (quizId, categoryId, blockId) => {
//     try {
//       if (!categoryId) {
//         throw new Error('Не вказано категорію.');
//       }

//       setQuizStates((prevStates) => {
//         const previousState = prevStates[quizId] || {};
//         const updatedUsedBlocks = { ...previousState.usedBlocks };

//         if (!updatedUsedBlocks[categoryId]) {
//           updatedUsedBlocks[categoryId] = [];
//         }

//         if (!updatedUsedBlocks[categoryId].includes(blockId)) {
//           updatedUsedBlocks[categoryId].push(blockId);
//         }

//         const updatedStates = {
//           ...prevStates,
//           [quizId]: {
//             ...previousState,
//             usedBlocks: updatedUsedBlocks,
//           },
//         };

//         safeStorage.setItem('quizStates', JSON.stringify(updatedStates));
//         safeStorage.setItem(`usedBlocks-${quizId}`, JSON.stringify(updatedUsedBlocks));

//         return updatedStates;
//       });
//     } catch (error) {
//       handleError(error, 'Не вдалося позначити блок як використаний.');
//     }
//   };

//   return (
//     <QuizContext.Provider value={{
//       showQuizPage,
//       setShowQuizPage,
//       selectedMode,
//       setSelectedMode,
//       currentQuizId,
//       setCurrentQuizId,
//       quizStates,
//       setQuizStates,
//       updateQuizState,
//       markBlockAsUsed,
//       data
//     }}>
//       {children}
//     </QuizContext.Provider>
//   );
// }
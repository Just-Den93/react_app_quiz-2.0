// // Функция для сброса состояния викторины
// export function resetQuizState(currentQuizId, setQuizStates) {
//   // Очищаем все данные текущей викторины в localStorage
//   localStorage.removeItem(`data-${currentQuizId}`);
//   localStorage.removeItem(`usedBlocks-${currentQuizId}`);
//   localStorage.removeItem('quizStates');  // Очищаем состояние викторины в localStorage

//   // Сбрасываем состояние викторины в контексте приложения
//   setQuizStates((prevStates) => ({
//     ...prevStates,
//     [currentQuizId]: {
//       usedBlocks: {},
//       data: null,
//     },
//   }));
// }

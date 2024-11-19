// Функция для начала викторины
export function startQuizHandler(mode, uuid, setSelectedMode, setCurrentQuizId, setShowQuizPage) {
  setSelectedMode(mode);
  setCurrentQuizId(uuid);
  setShowQuizPage(true);
  localStorage.setItem('showQuizPage', 'true');
}

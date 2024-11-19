// Функция для проверки, был ли блок уже использован
export function checkIfUsed(quizStates, currentQuizId, categoryId, blockId) {
	return quizStates[currentQuizId]?.usedBlocks?.[categoryId]?.includes(blockId);
  }
  
  // Функция для обработки клика по блоку
  export function handleBlockClick(block, categoryId, onBlockSelect) {
	onBlockSelect({ ...block, categoryId });
  }
  
// Форматирование текста с подсветкой в бэктиках
export const formatTextWithHighlights = (text) => {
    const regex = /`([^`]+)`/g;
    const parts = [];
    let lastIndex = 0;
    let match;
  
    while ((match = regex.exec(text)) !== null) {
      if (lastIndex < match.index) {
        parts.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>);
      }
      parts.push(
        <span key={match.index} style={{ backgroundColor: '#e21b3c', color: 'white', padding: '0 4px' }}>
          {match[1]}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }
  
    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }
  
    return parts;
  };
  
  // Определение размера шрифта для опций
  export const getOptionFontSize = (text) => {
    const length = text.length;
    if (length <= 10) {
      return 25;
    } else if (length <= 22) {
      return 22;
    } else if (length >= 100) {
      return 16;
    } else {
      return 18;
    }
  };
  
  // Определение размера шрифта для ответа
  export const getAnswerFontSize = (text) => {
    const length = text.length;
    if (length <= 90) {
      return 22;
    } else if (length <= 110) {
      return 20;
    } else {
      return 18;
    }
  };
  
  // Обработка завершения таймера
  export const handleForceStopInternal = (handleForceStop, setForceStopped) => {
    handleForceStop();
    setForceStopped(true);
  };
  
  // Обработка показа ответа
  export const handleShowAnswerInternal = (block, styles, handleShowAnswer, setAnswerShown, setHighlightedOptions) => {
    handleShowAnswer();
    setAnswerShown(true);
  
    const correctAnswerIndex = block.options.findIndex(
      (option) => option === block['correct answer']
    );
  
    const updatedOptions = block.options.map((option, index) => {
      if (index === correctAnswerIndex) {
        return '';
      }
      return styles.incorrectOption;
    });
  
    setHighlightedOptions(updatedOptions);
  };
  
  // Обработка подсказки
  export const handleHintInternal = (block, styles, setHintUsed, setHighlightedOptions) => {
    setHintUsed(true);
  
    const correctAnswerIndex = block.options.findIndex(
      (option) => option === block['correct answer']
    );
  
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * block.options.length);
    } while (randomIndex === correctAnswerIndex);
  
    const updatedOptions = block.options.map((option, index) => {
      if (index === correctAnswerIndex || index === randomIndex) {
        return '';
      }
      return styles.incorrectOption;
    });
  
    setHighlightedOptions(updatedOptions);
  };
  
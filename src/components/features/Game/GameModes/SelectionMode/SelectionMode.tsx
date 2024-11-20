// src/components/features/Game/GameModes/SelectionMode/SelectionMode.tsx
import React from 'react';
import { Button, BUTTON_VARIANTS } from '../../../../common/Button/Button';
import Timer from '../../../../common/Timer/Timer';
import styles from './SelectionMode.module.css';
import {
  handleForceStopInternal,
  handleShowAnswerInternal,
  handleHintInternal,
  getOptionFontSize,
  getAnswerFontSize,
  formatTextWithHighlights
} from './SelectionModeUtils';

interface Block {
  id: number;
  question: string;
  text: string;
  options: string[];
  categoryId: string;
  'correct answer': string;
}

interface SelectionModeProps {
  block: Block;
  categoryName: string;
  showAnswer: boolean;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
  timerStarted: boolean;
  timerEnded: boolean;
  handleTimerEnd: () => void;
  handleShowAnswer: () => void;
  handleSelectCategory: (categoryId: string, blockId: number) => void;
  handleForceStop: () => void;
}

interface HighlightedOptions {
  [key: number]: string;
}

const SelectionMode: React.FC<SelectionModeProps> = ({
  block,
  categoryName,
  showAnswer,
  setTimerStarted,
  timerStarted,
  timerEnded,
  handleTimerEnd,
  handleShowAnswer,
  handleSelectCategory,
  handleForceStop,
}) => {
  const [answerShown, setAnswerShown] = React.useState<boolean>(false);
  const [hintUsed, setHintUsed] = React.useState<boolean>(false);
  const [highlightedOptions, setHighlightedOptions] = React.useState<HighlightedOptions>({});
  const [forceStopped, setForceStopped] = React.useState<boolean>(false);

  React.useEffect(() => {
    setAnswerShown(false);
    setHintUsed(false);
    setHighlightedOptions({});
    setTimerStarted(false);
  }, [block, setTimerStarted]);

  // Мемоизация компонентов для оптимизации производительности
  const renderQuestion = React.useMemo(() => {
    return answerShown ? (
      <div 
        className={styles.question} 
        style={{ fontSize: `${getAnswerFontSize(block.text)}px` }}
      >
        {formatTextWithHighlights(block.text)}
      </div>
    ) : (
      <div className={styles.question}>{block.question}</div>
    );
  }, [answerShown, block.text, block.question]);

  const renderOptions = React.useMemo(() => {
    return block.options.map((option, index) => (
      <div
        key={index}
        className={`${styles.option} ${highlightedOptions[index] || ''}`}
        style={{ fontSize: `${getOptionFontSize(option)}px` }}
      >
        {option}
      </div>
    ));
  }, [block.options, highlightedOptions]);

  const renderControls = React.useMemo(() => {
    if (!timerStarted) {
      return (
        <Button 
          variant={BUTTON_VARIANTS.TIMER}
          onClick={() => setTimerStarted(true)}
        />
      );
    }

    if (!timerEnded) {
      return (
        <Timer
          key={block.id}
          duration={30}
          onEnd={handleTimerEnd}
          onForceStop={() => handleForceStopInternal(handleForceStop, setForceStopped)}
          forceStopped={forceStopped}
        />
      );
    }

    if (!answerShown) {
      return (
        <div className={styles.buttonGroup}>
          <Button 
            variant={BUTTON_VARIANTS.SHOW_ANSWER}
            onClick={() => handleShowAnswerInternal(block, styles, handleShowAnswer, setAnswerShown, setHighlightedOptions)}
          />
          {!hintUsed && (
            <Button 
              variant={BUTTON_VARIANTS.HINT}
              onClick={() => handleHintInternal(block, styles, setHintUsed, setHighlightedOptions)}
            />
          )}
        </div>
      );
    }

    return (
      <Button 
        variant={BUTTON_VARIANTS.SELECT_CATEGORY}
        onClick={() => handleSelectCategory(block.categoryId, block.id)}
      />
    );
  }, [
    timerStarted, 
    timerEnded, 
    answerShown, 
    hintUsed, 
    block, 
    handleForceStop, 
    handleShowAnswer, 
    handleSelectCategory,
    handleTimerEnd,
    forceStopped,
    setTimerStarted
  ]);

  return (
    <div className={styles.content}>
      <div className={styles.selectedInfo}>
        <span className={styles.infoCategoryName}>{categoryName}</span>
        <div className={styles.selectedNumber}>{block.id + 1}</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.selectionMode}>
          {renderQuestion}
          <div className={styles.options}>
            {renderOptions}
          </div>
        </div>
      </div>
      <div className={styles.controlBlock}>
        <div className={styles.timerSpace}>
          {renderControls}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SelectionMode);
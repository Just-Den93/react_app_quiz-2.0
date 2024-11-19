import React, { useState, useEffect } from 'react';
import { Button, BUTTON_VARIANTS } from '../../../../common/Button/Button';
import Timer from '../../../../common/Timer/Timer';
import styles from './QAMode.module.css';
import { resetQAState, handleQAActions } from './QAModeUtils';

function QAMode({
  block,
  showAnswer,
  setTimerStarted,
  timerStarted,
  timerEnded,
  handleTimerEnd,
  handleShowAnswer,
  handleSelectCategory,
  handleForceStop,
}) {
  const [forceStopped, setForceStopped] = useState(false);
  const [answerShown, setAnswerShown] = useState(false);
  const [localTimerStarted, setLocalTimerStarted] = useState(false);

  useEffect(() => {
    resetQAState(setForceStopped, setAnswerShown, setLocalTimerStarted);
  }, [block]);

  const renderControl = () => {
    if (!localTimerStarted) {
      return (
        <Button 
          variant={BUTTON_VARIANTS.TIMER}
          onClick={() => handleQAActions.startTimer(setTimerStarted, setLocalTimerStarted)}
        />
      );
    }

    if (!timerEnded) {
      return (
        <Timer
          duration={30}
          onEnd={handleTimerEnd}
          onForceStop={() => handleQAActions.forceStop(handleForceStop, setForceStopped)}
          forceStopped={forceStopped}
        />
      );
    }

    if (!answerShown) {
      return (
        <Button 
          variant={BUTTON_VARIANTS.SHOW_ANSWER}
          onClick={() => handleQAActions.showAnswer(handleShowAnswer, setAnswerShown)}
        />
      );
    }

    return (
      <Button 
        variant={BUTTON_VARIANTS.SELECT_CATEGORY}
        onClick={handleSelectCategory}
      />
    );
  };

  return (
    <div className={styles.content}>
      <div className={styles.selectedInfo}>
        <span className={styles.infoCategoryName}>{block.categoryName || 'No Category'}</span>
        <div className={styles.selectedNumber}>{block.id + 1}</div>
      </div>
      <h2>{showAnswer ? block.answer : block.question}</h2>
      {showAnswer && <p className={styles.subAnswer}>{block.subAnswer}</p>}
      <div className={styles.controlBlock}>
        {renderControl()}
      </div>
    </div>
  );
}

export default QAMode;
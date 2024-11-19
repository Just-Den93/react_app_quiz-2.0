import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

function SelectionMode({
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
}) {
  const [answerShown, setAnswerShown] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [highlightedOptions, setHighlightedOptions] = useState([]);
  const [forceStopped, setForceStopped] = useState(false);

  useEffect(() => {
    setAnswerShown(false);
    setHintUsed(false);
    setHighlightedOptions([]);
    setTimerStarted(false);
  }, [block, setTimerStarted]);

  return (
    <div className={styles.content}>
      <div className={styles.selectedInfo}>
        <span className={styles.infoCategoryName}>{categoryName}</span>
        <div className={styles.selectedNumber}>{block.id + 1}</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.selectionMode}>
          {answerShown ? (
            <div 
              className={styles.question} 
              style={{ fontSize: `${getAnswerFontSize(block.text)}px` }}
            >
              {formatTextWithHighlights(block.text)}
            </div>
          ) : (
            <div className={styles.question}>{block.question}</div>
          )}
          <div className={styles.options}>
            {block.options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${highlightedOptions[index] || ''}`}
                style={{ fontSize: `${getOptionFontSize(option)}px` }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.controlBlock}>
        <div className={styles.timerSpace}>
          {!timerStarted ? (
            <Button 
              variant={BUTTON_VARIANTS.TIMER}
              onClick={() => setTimerStarted(true)}
            />
          ) : !timerEnded ? (
            <Timer
              key={block.id}
              duration={30}
              onEnd={handleTimerEnd}
              onForceStop={() => handleForceStopInternal(handleForceStop, setForceStopped)}
              forceStopped={forceStopped}
            />
          ) : !answerShown ? (
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
          ) : (
            <Button 
              variant={BUTTON_VARIANTS.SELECT_CATEGORY}
              onClick={() => handleSelectCategory(block.categoryId, block.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

SelectionMode.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    categoryId: PropTypes.string.isRequired,
  }).isRequired,
  categoryName: PropTypes.string.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  setTimerStarted: PropTypes.func.isRequired,
  timerStarted: PropTypes.bool.isRequired,
  timerEnded: PropTypes.bool.isRequired,
  handleTimerEnd: PropTypes.func.isRequired,
  handleShowAnswer: PropTypes.func.isRequired,
  handleSelectCategory: PropTypes.func.isRequired,
  handleForceStop: PropTypes.func.isRequired,
};

export default SelectionMode;
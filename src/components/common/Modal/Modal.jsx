import React, { useState, useEffect } from 'react';
import { handleError } from '../../../utils/errorHandling';
import QAMode from '../../features/Game/GameModes/QAMode/QAMode';
import SelectionMode from '../../features/Game/GameModes/SelectionMode/SelectionMode';
import WarningMessage from '../../features/Game/Messages/WarningMessage/WarningMessage';
import styles from './Modal.module.css';
import { resetModalState, handleModalActions } from './modalUtils';

const modeComponents = {
  1: QAMode,
  2: SelectionMode,
};

function Modal({
  block,
  categoryName,
  onClose,
  selectedMode,
  onSelectCategory,
  isBlockUsed,
  onTryAgain,
  onContinue,
}) {
  const ModeComponent = modeComponents[selectedMode];

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    try {
      resetModalState(setTimerStarted, setShowAnswer, setTimerEnded);
    } catch (error) {
      handleError(error, 'Помилка при скиданні стану модального вікна.');
    }
  }, [block]);

  const handleModalClick = (e) => {
    try {
      if (e.target.classList.contains(styles.modal)) {
        onClose();
      }
    } catch (error) {
      handleError(error, 'Помилка при закритті модального вікна.');
    }
  };

  const handleBlockClick = (e) => {
    try {
      e.stopPropagation();
    } catch (error) {
      handleError(error, 'Помилка при обробці кліку.');
    }
  };

  const handleTimerEnd = () => {
    try {
      handleModalActions.setTimerEnded(setTimerEnded);
    } catch (error) {
      handleError(error, 'Помилка при завершенні таймера.');
    }
  };

  const handleShowAnswer = () => {
    try {
      handleModalActions.setShowAnswer(setShowAnswer);
    } catch (error) {
      handleError(error, 'Помилка при показі відповіді.');
    }
  };

  const handleForceStop = () => {
    try {
      handleModalActions.forceStop(setTimerEnded);
    } catch (error) {
      handleError(error, 'Помилка при примусовій зупинці.');
    }
  };

  const handleSelectCategory = () => {
    try {
      onSelectCategory(block.categoryId, block.id);
    } catch (error) {
      handleError(error, 'Помилка при виборі категорії.');
    }
  };

  if (!block) {
    return null;
  }

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={handleModalClick}>
      <div className={styles.modalContent} onClick={handleBlockClick}>
        <span 
          className={styles.closeButton} 
          onClick={() => {
            try {
              onClose();
            } catch (error) {
              handleError(error, 'Помилка при закритті вікна.');
            }
          }}
        >
          &times;
        </span>

        {isBlockUsed ? (
          <WarningMessage 
            onTryAgain={() => {
              try {
                onTryAgain();
              } catch (error) {
                handleError(error, 'Помилка при спробі повторити.');
              }
            }} 
            onContinue={() => {
              try {
                onContinue();
              } catch (error) {
                handleError(error, 'Помилка при продовженні.');
              }
            }} 
          />
        ) : (
          ModeComponent && (
            <ModeComponent
              block={block}
              categoryName={categoryName}
              showAnswer={showAnswer}
              setTimerStarted={setTimerStarted}
              timerStarted={timerStarted}
              timerEnded={timerEnded}
              handleTimerEnd={handleTimerEnd}
              handleShowAnswer={handleShowAnswer}
              handleSelectCategory={handleSelectCategory}
              handleForceStop={handleForceStop}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Modal;
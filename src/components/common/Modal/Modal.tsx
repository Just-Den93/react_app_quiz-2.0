// src/components/common/Modal/Modal.tsx
import React from 'react';
import { handleError } from '../../../utils/errorHandling';
import QAMode from '../../features/Game/GameModes/QAMode/QAMode';
import SelectionMode from '../../features/Game/GameModes/SelectionMode/SelectionMode';
import WarningMessage from '../../features/Game/Messages/WarningMessage/WarningMessage';
import styles from './Modal.module.css';
import { resetModalState, handleModalActions } from './modalUtils';

// Интерфейсы
interface Block {
  id: number;
  question: string;
  text: string;
  categoryId?: string;
  'correct answer'?: string;
  options?: string[];
}

interface ModeComponentsType {
  [key: number]: React.ComponentType<any>;
}

interface ModalProps {
  block: Block | null;
  categoryName: string;
  onClose: () => void;
  selectedMode: number;
  onSelectCategory: (categoryId: string, blockId: number) => void;
  isBlockUsed: boolean;
  onTryAgain: () => void;
  onContinue: () => void;
}

interface ModeComponentProps {
  block: Block;
  categoryName: string;
  showAnswer: boolean;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
  timerStarted: boolean;
  timerEnded: boolean;
  handleTimerEnd: () => void;
  handleShowAnswer: () => void;
  handleSelectCategory: () => void;
  handleForceStop: () => void;
}

// Компоненты для разных режимов
const modeComponents: ModeComponentsType = {
  1: QAMode,
  2: SelectionMode,
};

const Modal: React.FC<ModalProps> = ({
  block,
  categoryName,
  onClose,
  selectedMode,
  onSelectCategory,
  isBlockUsed,
  onTryAgain,
  onContinue,
}) => {
  const ModeComponent = modeComponents[selectedMode];

  const [timerStarted, setTimerStarted] = React.useState<boolean>(false);
  const [timerEnded, setTimerEnded] = React.useState<boolean>(false);
  const [showAnswer, setShowAnswer] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      resetModalState(setTimerStarted, setShowAnswer, setTimerEnded);
    } catch (error) {
      handleError(error, 'Ошибка при скидані стану модального вікна.');
    }
  }, [block]);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      if (e.target instanceof HTMLElement && e.target.classList.contains(styles.modal)) {
        onClose();
      }
    } catch (error) {
      handleError(error, 'Ошибка при закритті модального вікна.');
    }
  };

  const handleBlockClick = (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      e.stopPropagation();
    } catch (error) {
      handleError(error, 'Ошибка при обробці кліку.');
    }
  };

  const handleTimerEnd = () => {
    try {
      handleModalActions.setTimerEnded(setTimerEnded);
    } catch (error) {
      handleError(error, 'Ошибка при завершенні таймера.');
    }
  };

  const handleShowAnswer = () => {
    try {
      handleModalActions.setShowAnswer(setShowAnswer);
    } catch (error) {
      handleError(error, 'Ошибка при показі відповіді.');
    }
  };

  const handleForceStop = () => {
    try {
      handleModalActions.forceStop(setTimerEnded);
    } catch (error) {
      handleError(error, 'Ошибка при примусовій зупинці.');
    }
  };

  const handleSelectCategory = () => {
    try {
      if (block && block.categoryId) {
        onSelectCategory(block.categoryId, block.id);
      }
    } catch (error) {
      handleError(error, 'Ошибка при виборі категорії.');
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
          onClick={onClose}
        >
          &times;
        </span>

        {isBlockUsed ? (
          <WarningMessage 
            onTryAgain={onTryAgain}
            onContinue={onContinue}
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
};

export default Modal;
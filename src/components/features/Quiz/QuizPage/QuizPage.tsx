import React, { useMemo, useState } from 'react';
import ContentContainer from '../../../layout/ContentContainer/ContentContainer';
import EndMessage from '../../Game/Messages/EndMessage/EndMessage';
import MenuModal from '../../../common/MenuModal/MenuModal';
import Modal from '../../../common/Modal/Modal';
import Settings from '../../../features/Game/Settings/Settings';
import ConfettiAnimation from '../../Game/Animation/ConfettiAnimation';
import styles from './QuizPage.module.css';
import { useQuizContext } from '../../../../context/QuizContext';
import { QuizBlock, Category } from '../../../../types/quiz.types';
import PCImage from '../../../../assets/images/PC_horizontal_1line_black.svg';
import Utils from './quizPageUtils';

interface SelectedCategory extends Category {
  name: string;
}

const QuizPage: React.FC = () => {
  const { 
    quizStates, 
    setShowQuizPage, 
    currentQuizId, 
    selectedMode, 
    data, 
    markBlockAsUsed, 
    setQuizStates 
  } = useQuizContext();

  const currentQuizState = useMemo(() => 
    quizStates[currentQuizId || ''] || {}, 
    [quizStates, currentQuizId]
  );

  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState<QuizBlock | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory | null>(null);
  const [confettiRunning, setConfettiRunning] = useState<boolean>(false);
  const [showEndMessage, setShowEndMessage] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isBlockUsed, setIsBlockUsed] = useState<boolean>(false);

  const totalBlocks = useMemo(() => Utils.getTotalBlocks(data), [data]);
  const usedBlocksCount = useMemo(() => 
    Utils.getUsedBlocksCount(currentQuizState), 
    [currentQuizState]
  );

  const handleMainMenu = (): void => {
    setShowQuizPage(false);
  };

  const handleModalClose = (): void => {
    Utils.handleCloseModal(setSelectedBlock, setSelectedCategory, setIsBlockUsed);
  };

  const handleBlockSelectWrapper = (block: QuizBlock, category: Category): void => {
    Utils.handleBlockSelect(
      block,
      category,
      currentQuizState,
      setSelectedBlock,
      setSelectedCategory,
      setIsBlockUsed
    );
  };

  const handleSelectCategoryWrapper = (categoryId: string, blockId: number): void => {
    if (currentQuizId) {
      Utils.handleSelectCategory(
        categoryId,
        blockId,
        currentQuizId,
        markBlockAsUsed,
        totalBlocks,
        usedBlocksCount,
        setConfettiRunning,
        setShowEndMessage,
        handleModalClose
      );
    }
  };

  const handleNewGameWrapper = (): void => {
    if (currentQuizId) {
      Utils.handleNewGame(
        currentQuizId,
        setQuizStates,
        setConfettiRunning,
        setShowEndMessage
      );
    }
  };

  return (
    <div className={styles.quiz_page}>
      <ConfettiAnimation isRunning={confettiRunning} />
      {data ? (
        <>
          <img src={PCImage} alt="PC horizontal line" className={styles.image} />
          <ContentContainer
            data={data}
            onBlockSelect={handleBlockSelectWrapper}
            usedBlocks={currentQuizState.usedBlocks || {}}
          />

          {selectedBlock && (
            <Modal
              block={selectedBlock}
              categoryName={selectedCategory?.name || 'Без категории'}
              onClose={handleModalClose}
              selectedMode={selectedMode || 1}
              onSelectCategory={handleSelectCategoryWrapper}
              isBlockUsed={isBlockUsed}
              onTryAgain={() => setIsBlockUsed(false)}
              onContinue={handleModalClose}
            />
          )}
        </>
      ) : (
        <div>No data available.</div>
      )}

      {showEndMessage && currentQuizId && (
        <EndMessage
          currentQuizId={currentQuizId}
          setQuizStates={setQuizStates}
          onNewGame={handleNewGameWrapper}
          onMainMenu={handleMainMenu}
        />
      )}

      <MenuModal
        showSettings={() => setIsSettingsVisible(true)}
        showMainMenu={handleMainMenu}
        onNewGame={handleNewGameWrapper}
        isVisible={isMenuVisible}
        closeMenuModal={() => setIsMenuVisible(false)}
      />

      {isSettingsVisible && <Settings onClose={() => setIsSettingsVisible(false)} />}
    </div>
  );
};

export default QuizPage;
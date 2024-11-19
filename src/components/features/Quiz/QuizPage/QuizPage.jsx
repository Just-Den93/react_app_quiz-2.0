// import React, { useMemo, useState } from 'react';
// import ContentContainer from '../../../layout/ContentContainer/ContentContainer';
// import EndMessage from '../../Game/Messages/EndMessage/EndMessage';
// import MenuModal from '../../../common/MenuModal/MenuModal';
// import Modal from '../../../common/Modal/Modal';
// import Settings from '../../../features/Game/Settings/Settings';
// import ConfettiAnimation from '../../Game/Animation/ConfettiAnimation';
// import styles from './QuizPage.module.css';
// import { useQuizContext } from '../../../../context/QuizContext';
// import PCImage from '../../../../assets/images/PC_horizontal_1line_black.svg';
// import {
//   getTotalBlocks,
//   getUsedBlocksCount,
//   handleBlockSelect,
//   handleCloseModal,
//   handleNewGame,
//   handleMainMenu as quizPageHandleMainMenu,
//   handleSelectCategory
// } from './quizPageUtils';

// function QuizPage() {
//   const { quizStates, setShowQuizPage, currentQuizId, selectedMode, data, markBlockAsUsed, setQuizStates } = useQuizContext();

//   // Логируем состояние викторины
//   console.log('QuizPage: currentQuizId', currentQuizId);
//   console.log('QuizPage: quizStates', quizStates);

//   const currentQuizState = useMemo(() => quizStates[currentQuizId] || {}, [quizStates, currentQuizId]);
//   const [isSettingsVisible, setIsSettingsVisible] = useState(false);
//   const [selectedBlock, setSelectedBlock] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [confettiRunning, setConfettiRunning] = useState(false);
//   const [showEndMessage, setShowEndMessage] = useState(false);
//   const [isMenuVisible, setIsMenuVisible] = useState(false);
//   const [isBlockUsed, setIsBlockUsed] = useState(false);

//   const totalBlocks = useMemo(() => getTotalBlocks(data), [data]);
//   const usedBlocksCount = useMemo(() => getUsedBlocksCount(currentQuizState), [currentQuizState]);

//   // Логируем общее количество блоков и использованные блоки
//   console.log('Total blocks:', totalBlocks);
//   console.log('Used blocks count:', usedBlocksCount);

//   const handleMainMenu = () => {
//     console.log('QuizPage: handleMainMenu called');
//     setShowQuizPage(false);
//   };

//   return (
//     <div className={styles.quiz_page}>
//       <ConfettiAnimation isRunning={confettiRunning} />
//       {data ? (
//         <>
//           <img src={PCImage} alt="PC horizontal line" className={styles.image} />
//           <ContentContainer
//             data={data}
//             onBlockSelect={(block, category) =>
//               handleBlockSelect(
//                 block,
//                 category,
//                 currentQuizState,
//                 setSelectedBlock,
//                 setSelectedCategory,
//                 setIsBlockUsed
//               )
//             }
//             usedBlocks={currentQuizState.usedBlocks || {}}
//           />

//           {selectedBlock && (
//             <Modal
//               block={selectedBlock}
//               categoryName={selectedCategory?.name || 'Без категории'}
//               onClose={() => handleCloseModal(setSelectedBlock, setSelectedCategory, setIsBlockUsed)}
//               selectedMode={selectedMode}
//               onSelectCategory={(categoryId, blockId) =>
//                 handleSelectCategory(
//                   categoryId,
//                   blockId,
//                   currentQuizId,
//                   markBlockAsUsed,
//                   totalBlocks,
//                   usedBlocksCount,
//                   setConfettiRunning,
//                   setShowEndMessage,
//                   () => handleCloseModal(setSelectedBlock, setSelectedCategory, setIsBlockUsed)
//                 )
//               }
//               isBlockUsed={isBlockUsed}
//               onTryAgain={() => setIsBlockUsed(false)}
//               onContinue={() => handleCloseModal(setSelectedBlock, setSelectedCategory, setIsBlockUsed)}
//             />
//           )}
//         </>
//       ) : (
//         <div>No data available.</div>
//       )}

//       {showEndMessage && (
//         <EndMessage
//           currentQuizId={currentQuizId}
//           setQuizStates={setQuizStates}
//           onNewGame={() => handleNewGame(currentQuizId, setQuizStates, setConfettiRunning, setShowEndMessage)}
//           onMainMenu={handleMainMenu}
//         />
//       )}

//       <MenuModal
//         showSettings={() => setIsSettingsVisible(true)}
//         showMainMenu={handleMainMenu}
//         onNewGame={() => handleNewGame(currentQuizId, setQuizStates, setConfettiRunning, setShowEndMessage)}
//         isVisible={isMenuVisible}
//         closeMenuModal={() => setIsMenuVisible(false)}
//       />

//       {isSettingsVisible && <Settings onClose={() => setIsSettingsVisible(false)} />}
//     </div>
//   );
// }

// export default QuizPage;

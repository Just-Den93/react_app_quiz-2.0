import React from 'react';
import { Button, BUTTON_VARIANTS } from '../../../../common/Button/Button';
import styles from './EndMessage.module.css';
import { FaAward } from 'react-icons/fa';
import { resetQuizState } from './EndMessageUtils';

function EndMessage({ onNewGame, onMainMenu, currentQuizId, setQuizStates }) {
  const handleNewGame = () => {
    resetQuizState(currentQuizId, setQuizStates);
    onNewGame();
  };

  const handleMainMenu = () => {
    resetQuizState(currentQuizId, setQuizStates);
    onMainMenu();
  };

  return (
    <div id="end-message" className={styles.endMessage}>
      <div className={styles.endMessageContent}>
        <div className={styles.greetings}>Вітаю, ви завершили вікторину!</div>
        <div className={styles.awardIconContainer}>
          <FaAward className={styles.awardIcon} />
        </div>
        <div className={styles.buttons}>
          <Button 
            variant={BUTTON_VARIANTS.NEW_GAME}
            onClick={handleNewGame}
          />
          <Button 
            variant={BUTTON_VARIANTS.MAIN_MENU}
            onClick={handleMainMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default EndMessage;
import React from 'react';
import { Button, BUTTON_VARIANTS } from '../Button/Button';
import styles from './MenuModal.module.css';
import { useMenuModal, resetQuizStateAndCloseModal } from './menuModalUtils';
import { useQuizContext } from '../../../context/QuizContext';

function MenuModal({ showSettings, showMainMenu }) {
  const { isVisible, closeMenuModal } = useMenuModal();
  const { currentQuizId, setQuizStates } = useQuizContext();

  return (
    <div
      id="menu-modal"
      className={styles.menuModal}
      style={{ display: isVisible ? 'flex' : 'none', opacity: isVisible ? 1 : 0 }}
    >
      <div className={styles.menuModalContent}>
        <Button 
          variant={BUTTON_VARIANTS.NEW_GAME}
          onClick={() => resetQuizStateAndCloseModal(currentQuizId, setQuizStates, closeMenuModal)}
        />
        <Button 
          variant={BUTTON_VARIANTS.CONTINUE}
          onClick={closeMenuModal}
        />
        <Button 
          variant={BUTTON_VARIANTS.SETTINGS}
          onClick={showSettings}
        />
        <Button 
          variant={BUTTON_VARIANTS.MAIN_MENU}
          onClick={showMainMenu}
        />
      </div>
    </div>
  );
}

export default MenuModal;
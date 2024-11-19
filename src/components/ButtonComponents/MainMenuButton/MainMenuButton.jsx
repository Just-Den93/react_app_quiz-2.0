import React from 'react';
import styles from './MainMenuButton.module.css';

function MainMenuButton({ onClick }) {
  return (
    <button className={styles.mainMenuButton} onClick={onClick}>
      Головне меню
    </button>
  );
}

export default MainMenuButton;

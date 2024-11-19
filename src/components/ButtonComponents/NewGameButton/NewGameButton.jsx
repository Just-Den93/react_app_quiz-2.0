import React from 'react';
import styles from './NewGameButton.module.css';

function NewGameButton({ onNewGame }) {
  return (
    <button id="new-game-button" className={styles.newGameButton} onClick={onNewGame}>
      Нова гра
    </button>
  );
}

export default NewGameButton;

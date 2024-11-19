import React from 'react';
import styles from './ShowAnswerButton.module.css';

function ShowAnswerButton({ onClick }) {
  return (
    <button className={styles.showAnswerButton} onClick={onClick}>
      Показати відповідь
    </button>
  );
}

export default ShowAnswerButton;

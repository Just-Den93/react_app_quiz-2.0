import React from 'react';
import styles from './HintButton.module.css';


function HintButton({ onClick }) {
  return (
    <button className={styles.hintButton} onClick={onClick}>
      Підказка
    </button>
  );
}

export default HintButton;

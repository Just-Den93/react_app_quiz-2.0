import React from 'react';
import styles from './ContinueButton.module.css';

function ContinueButton({ onClick }) {
  return (
    <button className={styles.continueButton} onClick={onClick}>
      Продовжити
    </button>
  );
}

export default ContinueButton;

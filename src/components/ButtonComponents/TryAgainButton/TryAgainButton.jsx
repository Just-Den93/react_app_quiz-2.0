import React from 'react';
import styles from './TryAgainButton.module.css';

function TryAgainButton({ onClick }) {
  return (
    <button className={styles.tryAgainButton} onClick={onClick}>
      ПОВТОРИТИ
    </button>
  );
}

export default TryAgainButton;

import React from 'react';
import { LuTimer } from 'react-icons/lu';
import styles from './StartTimerButton.module.css';

function StartTimerButton({ onClick }) {
  return (
    <button className={styles.startTimerButton} onClick={onClick}>
      <LuTimer className={styles.startButtonIcon} />
    </button>
  );
}

export default StartTimerButton;

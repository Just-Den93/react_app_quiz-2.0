import React from 'react';
import styles from './Timer.module.css';
import { useTimer } from './timerUtils';

function Timer({ duration, onEnd, onForceStop }) {
  const { seconds, hovered, setHovered, handleForceStop } = useTimer(duration, onEnd, onForceStop);

  return (
    <div
      className={styles.timerContainer}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.timer}>
        <span className={styles.digit}>{String(Math.floor(seconds / 60)).padStart(2, '0').charAt(0)}</span>
        <span className={styles.digit}>{String(Math.floor(seconds / 60)).padStart(2, '0').charAt(1)}</span>
        <span className={styles.colon}>:</span>
        <span className={styles.digit}>{String(seconds % 60).padStart(2, '0').charAt(0)}</span>
        <span className={styles.digit}>{String(seconds % 60).padStart(2, '0').charAt(1)}</span>
      </div>
      {hovered && (
        <button className={styles.forceStopButton} onClick={handleForceStop}>
          СПИНИТИ
        </button>
      )}
    </div>
  );
}

export default Timer;

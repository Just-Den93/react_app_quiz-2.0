import React from 'react';
import styles from './SettingsButton.module.css';

function SettingsButton({ onClick }) {
  return (
    <button className={styles.settingsButton} onClick={onClick}>
      Налаштування
    </button>
  );
}

export default SettingsButton;

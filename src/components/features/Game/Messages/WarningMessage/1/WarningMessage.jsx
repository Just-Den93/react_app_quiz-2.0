import React from 'react';
import { Button, BUTTON_VARIANTS } from '../../../../common/Button/Button';
import styles from './WarningMessage.module.css';
import { IoWarning } from "react-icons/io5";

function WarningMessage({ onTryAgain, onContinue }) {
  return (
    <div className={styles.warningMessage}>
      <div className={styles.warningMessageContent}>
        <div className={styles.warningText}>Бажаєте пройти ще раз?</div>
        <div className={styles.warningIconContainer}>
          <IoWarning className={styles.warningIcon} />
        </div>
        <div className={styles.buttons}>
          <Button 
            variant={BUTTON_VARIANTS.TRY_AGAIN}
            onClick={onTryAgain}
          />
          <Button 
            variant={BUTTON_VARIANTS.CONTINUE}
            onClick={onContinue}
          />
        </div>
      </div>
    </div>
  );
}

export default WarningMessage;
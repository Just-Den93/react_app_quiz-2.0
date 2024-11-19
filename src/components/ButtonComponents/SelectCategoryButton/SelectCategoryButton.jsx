import React from 'react';
import styles from './SelectCategoryButton.module.css';

function SelectCategoryButton({ onClick }) {
  return (
    <button className={styles.selectCategoryButton} onClick={onClick}>
      Обрати категорію
    </button>
  );
}

export default SelectCategoryButton;

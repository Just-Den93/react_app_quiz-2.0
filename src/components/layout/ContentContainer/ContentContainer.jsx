import React from 'react';
import styles from './ContentContainer.module.css';
import { renderCategoryRows } from './contentContainerUtils';

function ContentContainer({ data, onBlockSelect }) {
  return (
    <div className={styles.contentContainer}>
      {renderCategoryRows(data, onBlockSelect)} {/* Используем вынесенную функцию */}
    </div>
  );
}

export default ContentContainer;

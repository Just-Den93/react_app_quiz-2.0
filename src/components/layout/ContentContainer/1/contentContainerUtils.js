import React from 'react';
import CategoryRow from '../../../features/Quiz/CategoryRow/CategoryRow';

// Функция для рендеринга строк категорий
export function renderCategoryRows(data, onBlockSelect) {
  return data.map((category) => (
    <CategoryRow
      key={category.id}
      category={category}
      onBlockSelect={onBlockSelect}
    />
  ));
}

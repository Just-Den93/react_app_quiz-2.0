import React from 'react';
import Item from '../Item/Item';
import styles from './CategoryRow.module.css';
import { Category, QuizBlock } from '../../../../types/quiz.types';
import { handleBlockSelection } from './CategoryRowUtils';

interface CategoryRowProps {
  category: Category;
  onBlockSelect: (block: QuizBlock, category: Category) => void;
  usedBlocks: number[];
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, onBlockSelect, usedBlocks }) => {
  return (
    <div className={styles.categoryRow}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.items}>
        {category.blocks.map((block) => (
          <Item
            key={`${category.id}-${block.id}`}
            block={block}
            categoryId={category.id}
            onBlockSelect={(blockData: QuizBlock) => handleBlockSelection(blockData, category, onBlockSelect)}
            isUsed={usedBlocks.includes(block.id)}  // Передаем проп isUsed
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;

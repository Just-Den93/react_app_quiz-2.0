import React from 'react';
import { Category, QuizBlock } from '../../../types/quiz.types';
import styles from './ContentContainer.module.css';
import CategoryRow from '../../features/Quiz/CategoryRow/CategoryRow';

interface ContentContainerProps {
  data: Category[];
  onBlockSelect: (block: QuizBlock, category: Category) => void;
  usedBlocks: { [key: string]: number[] };
}

const ContentContainer: React.FC<ContentContainerProps> = ({ data, onBlockSelect, usedBlocks }) => {
  return (
    <div className={styles.contentContainer}>
      {data.map((category) => (
        <CategoryRow
          key={category.id}
          category={category}
          onBlockSelect={onBlockSelect}
          usedBlocks={usedBlocks[category.id] || []}
        />
      ))}
    </div>
  );
};

export default ContentContainer;
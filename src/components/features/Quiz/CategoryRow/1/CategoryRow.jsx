// import React from 'react';
// import Item from '../../../features/Quiz/Item/Item';
// import styles from './CategoryRow.module.css';
// import { handleBlockSelection } from './CategoryRowUtils';

// function CategoryRow({ category, onBlockSelect }) {
//   return (
//     <div className={styles.categoryRow}>
//       <div className={styles.categoryName}>{category.name}</div>
//       <div className={styles.items}>
//         {category.blocks.map((block) => (
//           <Item
//             key={`${category.id}-${block.id}`}
//             block={block}
//             categoryId={category.id}
//             onBlockSelect={(blockData) => handleBlockSelection(blockData, category, onBlockSelect)} // Используем вынесенную функцию
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CategoryRow;

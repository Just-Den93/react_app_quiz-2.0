import React from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <button className={styles.tab}>
        <FaBars className={styles.icon} />
        <span className={styles.tabText}>Бібліотека</span>
      </button>
    </div>
  );
}

export default Sidebar;

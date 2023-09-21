import React from 'react';
import styles from './sortblock.css';
import { RocketIcon } from '../../Icons';


export function SortBlock() {
  return (
    <div className={styles.sortBlock}>
      <RocketIcon />
      <select className={styles.sortSelect}>
        <option>Лучшие</option>
        <option>По автору</option>
        <option>По дате</option>
      </select>
    </div>
  );
}

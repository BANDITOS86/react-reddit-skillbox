import React from "react";
import styles from "./createdat.css";

export interface IPublishedDate {
  published?: string;
}

export function CreatedAt({ published }: IPublishedDate) {
  return (
    <span className={styles.createdAt}>
      <span className={styles.publishedLabel}>опубликованно </span>
      {published ?? '4 часа назад'}
    </span>
  );
}

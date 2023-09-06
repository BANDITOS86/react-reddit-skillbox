import React from "react";
import styles from "./title.css";
import { Link } from "react-router-dom";

// Определение интерфейса свойств компонента Title
export interface ITitleProps {
  id: string;
  subreddit: string;
  title: string;
}

// Определение компонента Title
export function Title({ id, subreddit, title }: ITitleProps) {
  return (
    <h2 className={styles.title}>
      <Link to={`/posts/${subreddit}/${id}`} className={styles.postLink}
      >
        {/* Отображение заголовка поста, или текста по умолчанию, если заголовок отсутствует */}
        {title ??
          `Следует отметить, что новая модель организационной деятельности 
          Следует отметить, что новая модель организационной деятельности`}
      </Link>
    </h2>
  );
}

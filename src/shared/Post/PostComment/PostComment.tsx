import React from 'react';
import styles from './postcomment.css';
import { KarmaCounter } from '../../CardsList/Card/Controls/KarmaCounter'; 
import { Icon } from '../../Icon'; 
import { EColor, Text } from '../../Text'; 
import { UserLink } from '../../CardsList/Card/TextContent/UserLink';
import { PostCommentForm } from './PostCommentForm';

// Определение интерфейса свойств компонента PostComment
export interface IPostCommentProps {
  commentId: string; // Идентификатор комментария
  author: string; // Автор комментария
  score: string; // Счетчик кармы комментария
  created: number; // Время создания комментария
  body: string; // Текст комментария
  replies?: Array<IPostCommentProps>; // Массив ответов на комментарий
}

// Определение компонента PostComment
export function PostComment({
  commentId,
  author,
  score,
  created,
  body,
  replies,
}: IPostCommentProps) {
  // Использование хука useState для управления видимостью формы ответа на комментарий
  const [showCommentForm, setShowCommentForm] = React.useState(false);
  // Использование хука useState для управления фокусировкой формы ответа на комментарий
  const [focusCommentForm, setFocusCommentForm] = React.useState(0);

  // Обработчик нажатия на кнопку "Ответить"
  function handleAnswerButton() {
    setShowCommentForm(true); // Отображение формы ответа на комментарий
    setFocusCommentForm(focusCommentForm + 1); // Установка фокуса на форму ответа
  }

  return (
    // Обертка для комментария
    <div className={styles.commentContainer}>
      {/* Блок счетчика кармы и вертикальной линии разделения */}
      <div className={styles.counterContainer}>
        <KarmaCounter score={score} /> {/* Отображение счетчика кармы */}
        <div className={styles.verticalLine}></div> {/* Вертикальная линия */}
      </div>

      {/* Блок с текстовым контентом комментария */}
      <div className={styles.textContainer}>
        {/* Метаданные комментария */}
        <div className={styles.metaData}>
          <UserLink username={author} /> {/* Ссылка на автора комментария */}
          <span className={styles.createdAt}>4 часа назад</span> {/* Время создания комментария */}
          <div className={styles.userLabel}>Лига юристов</div> {/* Метка пользователя */}
        </div>

        {/* Текст комментария */}
        <p className={styles.textContent}>{body}</p>

        {/* Список действий с комментарием */}
        <ul className={styles.actions}>
          <li className={styles.actionItem} onClick={handleAnswerButton}>
            <Icon name='AnswerIcon' size={14} /> {/* Иконка для ответа на комментарий */}
            <Text size={14} color={EColor.gray99}>
              Ответить
            </Text>
          </li>

          <li className={styles.actionItem}>
            <Icon name='ShareIcon' size={14} /> {/* Иконка для поделиться комментарием */}
            <Text size={14} color={EColor.gray99}>
              Поделиться
            </Text>
          </li>

          <li className={styles.actionItem}>
            <Icon name='WarningIcon' size={16} /> {/* Иконка для жалобы на комментарий */}
            <Text size={14} color={EColor.gray99}>
              Пожаловаться
            </Text>
          </li>
        </ul>

        {/* Отображение ответов на комментарий */}
        {replies !== undefined &&
          replies.map((commentData) => (
            <PostComment key={commentData.commentId} {...commentData} />
          ))}

        {/* Отображение формы ответа на комментарий */}
        {showCommentForm && (
          <div className={styles.postCommentForm}>
            {/* НЕ контролируемая компонента */}
             {/* <PostCommentForm
              authorName={author}
              setFocus={focusCommentForm}
              onCommentSubmit={(comment: string): void => {}}
            /> */}
            {/* Контролируемая компонента */}
            <PostCommentForm authorName={author} setFocus={focusCommentForm} />
          </div>
        )}
      </div>
    </div>
  );
}

import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateComment } from '../../store/reducer';
import { CommentForm } from '../CommentForm';

// Компонент CommentFormContainer, который связывает состояние Redux с компонентом CommentForm
export function CommentFormContainer() {
  // Получение значения комментария из состояния Redux
  const value = useSelector<RootState, string>((state) => state.commentText);
  const dispatch = useDispatch(); // Инициализация диспетчера Redux

  // Обработчик изменения текста комментария
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateComment(event.target.value)); // Диспетчинг экшена для обновления текста комментария в состоянии Redux
  }

  // Обработчик отправки формы
  function handleSubmit() {
    alert('Форма отправлена'); // Вывод сообщения при отправке формы
  }

  return (
    // Отображение компонента CommentForm, передача необходимых свойств и обработчиков
    <CommentForm
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

import React, { ChangeEvent, FormEvent, useRef } from 'react';
import styles from './postcommentform.css';

//Контролируемая компонента
// Определение интерфейса свойств компонента PostCommentForm
interface IPostCommentFormProps {
  authorName: string; // Имя автора комментария (переданное в props)
  setFocus?: number; // Переменная, сигнализирующая о необходимости фокусировки
}

// Определение компонента PostCommentForm
export function PostCommentForm({
  authorName,
  setFocus,
}: IPostCommentFormProps) {
  // Использование хука useState для управления содержимым текстового поля
  const [value, setValue] = React.useState(`${authorName}, `);
  // Создание ссылки ref, связанной с текстовым полем
  const ref = useRef<HTMLTextAreaElement>(null);

  // Эффект для фокусировки на текстовом поле при изменении переменной setFocus
  React.useEffect(() => {
    ref.current?.focus(); // Фокусировка на текстовом поле
  }, [setFocus]);

  // Обработчик изменения содержимого текстового поля
  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value); // Обновление состояния значения
  }

  // Обработчик фокусировки на текстовом поле
  function handleTextareaFocus() {
    if (ref.current) {
      const { value } = ref.current;

      if (value) {
        ref.current.value = ''; // Очистка содержимого
        ref.current.value = value; // Восстановление содержимого для сохранения положения курсора
      }
    }
  }

  // Обработчик отправки формы
  function handleSubmit(event: FormEvent) {
    event.preventDefault(); // Отмена действия по умолчанию (перезагрузки страницы)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Текстовое поле для ввода комментария */}
      <textarea
        className={styles.input}
        value={value}
        ref={ref}
        onFocus={handleTextareaFocus}
        onChange={handleTextareaChange}
      />
      {/* Кнопка для отправки комментария */}
      <button type="submit" className={styles.button}>
        Комментировать
      </button>
    </form>
  );
}

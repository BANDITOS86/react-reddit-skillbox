import React, { ChangeEvent } from 'react';
import styles from './commentform.css';
import { useForm } from 'react-hook-form';

// Определение интерфейса для свойств компонента CommentForm
interface ICommentFormProps {
  value: string; // Текущее значение текста
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; // Обработчик изменения текста
  onSubmit: () => void; // Обработчик отправки формы
}

// Компонент CommentForm, который отображает форму для ввода комментария
export function CommentForm({ value, onChange, onSubmit }: ICommentFormProps) {
  // Использование хука useForm из react-hook-form для управления формой
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: value, // Использование переданного значения текста в форму
    },
  });

  const onSubmitForm = () => onSubmit(); // Вызов переданной функции onSubmit при отправке формы

  return (
    // Отображение формы
    <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
      <textarea
        className={styles.input} // Применение стилей для текстового поля
        {...register('text', { required: true, minLength: 3 })} // Регистрация поля в react-hook-form с правилами валидации
        onChange={onChange} // Обработчик изменения текста в поле
        aria-invalid={errors.text ? 'true' : undefined} // Установка атрибута aria-invalid в зависимости от наличия ошибок
      />
      {errors.text && <p>Введите больше 3-х символов</p>} {/* Отображение ошибки, если текст не соответствует правилам валидации */}

      <button type="submit" className={styles.button}>
        Комментировать
      </button>
    </form>
  );
}

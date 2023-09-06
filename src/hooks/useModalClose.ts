import { useEffect, useRef } from 'react';

// Интерфейс для пропсов пользовательского хука
interface IUseModalCloseProps {
  onClose?: () => void;
}

export const useModalClose = ({ onClose }: IUseModalCloseProps) => {
  // Создаем ref для отслеживания элемента
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Функция для обработки кликов вне целевого элемента
    const handleClick = (event: MouseEvent) => {
      const { target } = event;

      // Проверяем, что клик был сделан вне ref элемента
      if (target instanceof Node && !ref.current?.contains(target)) {
        onClose?.();
      }
    }

    // Добавляем обработчик события клика
    document.addEventListener('click', handleClick);

    // Очищаем: удаляем обработчик события при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  return [ref];
}
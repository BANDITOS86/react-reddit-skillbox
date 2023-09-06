import React from "react";
import styles from "./dropdown.css";
import { useModalClose } from "../../hooks/useModalClose";
import { createPortal } from "react-dom";

// Определение интерфейса для свойств компонента Dropdown
interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

// Функция-заглушка, ничего не делает
const NOOP = () => {};

// Основной компонент Dropdown
export function Dropdown({
  button,
  children,
  isOpen,
  onOpen = NOOP,
  onClose = NOOP,
}: IDropdownProps) {
  // Состояние для отслеживания открытого/закрытого состояния выпадающего меню
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);

  // Синхронизируем внутреннее состояние с переданной пропсой при её изменении
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);

  // Вызываем функции onOpen или onClose в зависимости от состояния выпадающего меню
  React.useEffect(
    () => (isDropdownOpen ? onOpen() : onClose()),
    [isDropdownOpen, onOpen, onClose]
  );

  // Функция для обработки открытия/закрытия меню
  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  // Пользовательский хук для обработки закрытия выпадающего меню при клике вне него
  const [ref] = useModalClose({ onClose: () => setIsDropdownOpen(false) });

  // Находим DOM-узел, куда будем вставлять содержимое выпадающего меню
  const node = document.querySelector('#dropdown_root');

  // Возвращаем null, если целевой узел не найден
  if (!node) {
    return null;
  }

  // Рассчитываем позицию выпадающего меню
  const bodyPosition = document.body.getBoundingClientRect();
  const refPosition = ref.current?.getBoundingClientRect();

  const dropdownPositionTop =
    Math.abs(bodyPosition.y) + (refPosition?.bottom ?? 0) + 10;
  const dropdownPositionRight = bodyPosition.right - (refPosition?.right ?? 0);

  return (
    <div className={styles.container} ref={ref}>
      {/* Обработчик для открытия/закрытия меню */}
      <div onClick={handleOpen}>{button}</div>
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
            {/* Используем createPortal для рендера содержимого выпадающего меню */}
            {createPortal(
              <div
                style={{
                  position: 'absolute',
                  top: `${dropdownPositionTop}px`,
                  right: `${dropdownPositionRight}px`,
                }}
              >
                {children}
              </div>,
              node
            )}
          </div>
        </div>
      )}
    </div>
  );
}

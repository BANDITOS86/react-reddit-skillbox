import React from "react";
import styles from "./menu.css";
import { MenuIcon } from "../../../Icons";
import { Dropdown } from "../../../Dropdown";
import { EColor, Text } from "../../../Text";
import { IMenuItemsListProps, MenuItemsList } from "./MenuItemsList";

// Интерфейс для пропсов компонента Menu
export interface IMenuProps extends IMenuItemsListProps {}

export function Menu({ id }: IMenuProps) {
  return (
    <div className={styles.menu}>
      {/* Компонент Dropdown с кастомной кнопкой */}
      <Dropdown
        button={
          <button className={styles.menuButton}>
            <MenuIcon />
          </button>
        }
      >
        {/* Содержимое выпадающего меню, {children}*/}
        <div className={styles.dropdown}>
          <MenuItemsList id={id} />
          <button className={styles.closeButton}>
            <Text mobileSize={12} size={14} color={EColor.gray66}>
              Закрыть
            </Text>
          </button>
        </div>
      </Dropdown>
    </div>
  );
}

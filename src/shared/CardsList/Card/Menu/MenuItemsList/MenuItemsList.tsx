import React from 'react';
import styles from './menuitemslist.css';
import { EColor, Text } from '../../../../Text';
import { Icon } from '../../../../Icon';

export interface IMenuItemsListProps {
  id: string;
}

export function MenuItemsList({ id }: IMenuItemsListProps) {
  return (
    <ul className={styles.menuItemsList}>
      <li className={`${styles.menuItem} ${styles.hideOnMobile}`}>
        <Icon name='SaveIcon' size={16} mobileSize={12} />
        <Text size={12} color={EColor.gray99}>Комментарии</Text>
      </li>

      <div className={`${styles.divider} ${styles.hideOnMobile}`} />

      <li className={`${styles.menuItem} ${styles.hideOnMobile}`}>
        <Icon name='ShareIcon' size={1214} />
        <Text size={12} color={EColor.gray99}>Поделиться</Text>
      </li>

      <div className={`${styles.divider} ${styles.hideOnMobile}`} />

      <li className={styles.menuItem} onClick={() => console.log(id)}>
        <Icon name='BlockIcon' size={14} mobileSize={12} />
        <Text size={12} color={EColor.gray99}>Скрыть</Text>
      </li>

      <div className={styles.divider} />

      <li className={`${styles.menuItem} ${styles.hideOnMobile}`}>
        <Icon name='SaveIcon' size={16} />
        <Text size={12} color={EColor.gray99}>Сохранить</Text>
      </li>

      <div className={`${styles.divider} ${styles.hideOnMobile}`} />

      <li className={styles.menuItem}>
        <Icon name='WarningIcon' size={16} mobileSize={12} />
        <Text size={12} color={EColor.gray99}>Пожаловаться</Text>
      </li>
    </ul>
  );
}

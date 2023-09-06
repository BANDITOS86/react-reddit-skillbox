import React from "react";
import styles from "./card.css";
import { ITextContentProps, TextContent } from "./TextContent";
import { IPreviewProps, Preview } from "./Preview";
import { IMenuProps, Menu } from "./Menu";
import { Controls, IControlsProps } from "./Controls";

// Определение интерфейса для свойств карточки (Card)
export interface ICardProps
  extends ITextContentProps,
    IPreviewProps,
    IMenuProps,
    IControlsProps {}

// Компонент карточки (Card) для отображения информации о посте
export function Card({
  id,
  subreddit,
  username,
  title,
  userUrl,
  avatarSrc,
  published,
  previewSrc,
  score,
}: ICardProps) {
  return (
    <li className={styles.card}>
      <TextContent
        id={id}
        subreddit={subreddit}
        username={username}
        title={title}
        userUrl={userUrl}
        avatarSrc={avatarSrc}
        published={published}
      />

      <Preview previewSrc={previewSrc} />
      <Menu id={id} />
      <Controls score={score} />
    </li>
  );
}

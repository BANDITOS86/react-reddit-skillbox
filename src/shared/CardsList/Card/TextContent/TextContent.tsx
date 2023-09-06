import React from "react";
import styles from "./textContent.css";
import { IUserLinkProps, UserLink } from "./UserLink";
import { CreatedAt, IPublishedDate } from "./CreatedAt";
import { ITitleProps, Title } from "./Title";

export interface ITextContentProps extends IUserLinkProps, IPublishedDate, ITitleProps {}

export function TextContent({
  id,
  subreddit,
  username,
  title,
  userUrl,
  avatarSrc,
  published,
}: ITextContentProps) {
  return (
    <div className={styles.textContent}>
      <div className={styles.metaData}>
        <UserLink username={username} userUrl={userUrl} avatarSrc={avatarSrc} />
        <CreatedAt published={published} />
      </div>

      <Title id={id} subreddit={subreddit} title={title} />
    </div>
  );
}

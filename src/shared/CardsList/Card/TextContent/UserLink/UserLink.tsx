import React from "react";
import styles from "./userlink.css";

export interface IUserLinkProps {
  username: string;
  userUrl?: string;
  avatarSrc?: string;
}

export function UserLink({ username, userUrl, avatarSrc }: IUserLinkProps) {
  return (
    <div className={styles.userLink}>
      <img
        className={styles.avatar}
        src={
          (typeof avatarSrc === 'string' && avatarSrc !== '') ? avatarSrc : "https://yt3.googleusercontent.com/ytc/AGIKgqP-WA__os52wJaoQUyF0ICLdt-mxAplMQn5nsAt=s900-c-k-c0x00ffffff-no-rj"
        }
        
        alt="avatar"
      />
      <a href={userUrl ?? "#user-url"} className={styles.username}>
        {username ?? 'Дмитрий Гришин'}
      </a>
    </div>
  );
}

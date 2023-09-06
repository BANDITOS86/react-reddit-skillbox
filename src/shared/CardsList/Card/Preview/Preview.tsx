import React from "react";
import styles from "./preview.css";

export interface IPreviewProps {
  previewSrc?: string;
}

export function Preview({ previewSrc }: IPreviewProps) {
  return (
    <div className={styles.preview}>
      <img
        className={styles.previewImg}
        src={
          previewSrc ?? 
          "https://avatars.mds.yandex.net/i?id=c71d3b259c718a6341e8d7674ef4e430_l-8082166-images-thumbs&n=13"
        }
        alt="card picture"
      />
    </div>
  );
}

import React from "react";
import styles from "./controls.css";
import { IKarmaCounterProps, KarmaCounter } from "./KarmaCounter";
import { CommentsButton } from "./CommentsButton";
import { Actions } from "./Actions";

export interface IControlsProps extends IKarmaCounterProps {}

export function Controls({ score }: IControlsProps) {
  return (
    <div className={styles.controls}>
      <KarmaCounter score={score} />
      <CommentsButton />
      <Actions />
    </div>
  );
}

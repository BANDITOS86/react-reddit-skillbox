import React from "react";
import styles from "./sortblock.css";
import { RocketIcon } from "../../Icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";

export function SortBlock() {
  const token = useSelector<RootState>((state) => state.token);

  return (
    <div className={styles.sortBlock}>
      {token !== 'undefined' ? (
        <>
          <RocketIcon />
          <select className={styles.sortSelect}>
            <option>Лучшие</option>
            <option>По автору</option>
            <option>По дате</option>
          </select>
        </>
      ) : null}
    </div>
  );
}

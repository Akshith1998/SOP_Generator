import React from "react";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>NovoSOP Generator (AI based)</div>
    </div>
  );
};

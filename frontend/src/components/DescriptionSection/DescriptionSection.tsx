import React from "react";
import styles from "./Section.module.scss";

export const DescriptionSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Statement of purpose tool based on AI</div>
      <div className={styles.desc}>
        Fill the following details to generate SOPs which are personalised based
        on your profile.Please proof read after the SOP is generated.
      </div>
    </div>
  );
};

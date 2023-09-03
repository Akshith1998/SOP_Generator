import React from "react";
import styles from "./Steps.module.scss";
import { useSelector } from "react-redux";

interface ItemProps {
  stepNumber: number;
  detailName: string;
  totalSteps: number;
  index: number;
}

export const StepsItem = (props: ItemProps) => {
  const { sectionIndex } = useSelector((state: any) => state.section);

  return (
    <div className={styles.subContainer}>
      <div className={styles.topContainer}>
        <div
          className={
            props.stepNumber === sectionIndex
              ? styles.activeNumber
              : styles.number
          }
        >
          {props.stepNumber}
        </div>
        <div
          className={
            props.stepNumber === sectionIndex ? styles.activeName : styles.name
          }
        >
          {props.detailName}
        </div>
      </div>
      {props.index !== props.totalSteps - 1 && (
        <hr className={styles.bottomContainer}></hr>
      )}
    </div>
  );
};

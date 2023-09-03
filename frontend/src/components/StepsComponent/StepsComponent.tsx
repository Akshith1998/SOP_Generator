import React from "react";
import styles from "./Steps.module.scss";
import { StepsItem } from "./StepsItem.tsx";

export const StepsComponent = () => {
  const StepsArr = [
    {
      number: 1,
      detailName: "Personal Details",
    },
    {
      number: 2,
      detailName: "Previous Education",
    },
    {
      number: 3,
      detailName: "Work Experience",
    },
    {
      number: 4,
      detailName: "Admission Details",
    },
    {
      number: 5,
      detailName: "Generate SOP",
    },
  ];
  return (
    <div className={styles.container}>
      {StepsArr.map((data: any, index: number) => {
        return (
          <StepsItem
            stepNumber={data.number}
            detailName={data.detailName}
            totalSteps={StepsArr.length}
            index={index}
          />
        );
      })}
    </div>
  );
};

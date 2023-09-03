import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { updateFocus, changeSection } from "../../redux/SectionSlice.js";

export const GenerateSOP = () => {
  const dispatch = useDispatch();
  const { checkFocus, sectionIndex } = useSelector((state) => state.section);

  useEffect(() => {
    if (checkFocus) {
      dispatch(changeSection(sectionIndex - 1));
      dispatch(updateFocus(false));
    }
  }, [checkFocus]);

  return (
    <div className={styles.DetailsCont}>
      <div className={styles.confirm}>
        Please confirm that the entered content is correct. Click on generate
        button to generate the customised SOOP. Check your email to see the
        SOP(check in spam if not received).
      </div>
    </div>
  );
};

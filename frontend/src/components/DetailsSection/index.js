import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PersonalDetails } from "./PersonalDetails.js";
import { PreviousEducation } from "./PreviousEducation.js";
import { WorkExp } from "./WorkExp.js";
import { AdmissionDetailsSection } from "./AdmissionDetails.js";
import { GenerateSOP } from "./GenerateSOP.js";
import {
  updateFocus,
  updateNavigation,
  sendSOPDetails,
} from "../../redux/SectionSlice.js";
import styles from "./styles.module.scss";

export const DetailsSection = () => {
  const dispatch = useDispatch();
  const {
    sectionIndex,
    personalDetails,
    PreviousEducationDetails,
    WorkExpDetails,
    AdmissionDetails,
  } = useSelector((state) => state.section);

  const sectionComponents = {
    1: <PersonalDetails />,
    2: <PreviousEducation />,
    3: <WorkExp />,
    4: <AdmissionDetailsSection />,
    5: <GenerateSOP />,
  };

  const handleNext = () => {
    if (sectionIndex <= Object.keys(sectionComponents).length) {
      dispatch(updateFocus(true));
      dispatch(updateNavigation("next"));
    }
  };

  const handleBack = () => {
    dispatch(updateFocus(true));
    dispatch(updateNavigation("back"));
  };

  const handleSubmit = () => {
    let details = {
      PersonalDetails: personalDetails,
      PreviousEducationDetails: PreviousEducationDetails,
      WorkExpDetails: WorkExpDetails,
      AdmissionDetails: AdmissionDetails,
    };
    dispatch(sendSOPDetails(details));
  };

  return (
    <div className={styles.container}>
      {sectionComponents[sectionIndex]}
      <div className={styles.ButtonDiv}>
        {sectionIndex !== 1 &&
          sectionIndex !== Object.keys(sectionComponents).length + 1 && (
            <button onClick={handleBack} className={styles.backButton}>
              Back
            </button>
          )}
        {sectionIndex !== Object.keys(sectionComponents).length && (
          <button onClick={handleNext} className={styles.nextButton}>
            Next
          </button>
        )}
        {sectionIndex === Object.keys(sectionComponents).length && (
          <button onClick={handleSubmit} className={styles.nextButton}>
            GENERATE
          </button>
        )}
      </div>
    </div>
  );
};

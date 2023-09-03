import React, { useState, useEffect } from "react";
import { CommonInput } from "../../utils/CommonInput/CommonInput.js";
import styles from "./styles.module.scss";
import {
  updateAdmissionDetails,
  updateFocus,
  changeSection,
} from "../../redux/SectionSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Validate } from "../../utils/Validate.js";

export const AdmissionDetailsSection = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    instituteAdmitted: "",
    programStudy: "",
    applyingCountry: "",
    futureGoals: "",
    listening: "",
    reading: "",
    speaking: "",
    writing: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const { AdmissionDetails, navigation, sectionIndex, checkFocus } =
    useSelector((state) => state.section);

  const inputs = [
    {
      id: 1,
      name: "instituteAdmitted",
      type: "text",
      placeholder: "Institute Admitted",
      errorMessage: "It should be a valid institute name!",
      label: "What institute did you get admitted to in Canada?",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "programStudy",
      type: "text",
      placeholder: "Program Study",
      errorMessage: "It should be a valid study program!",
      label: "What is your program of study in Canada?",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "applyingCountry",
      type: "text",
      placeholder: "Applying Country",
      errorMessage: "It should be a valid country name!",
      label: "Which country are you applying from?",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 4,
      name: "futureGoals",
      type: "text",
      placeholder: "Future goals",
      errorMessage: "It should be valid goals!",
      label: "What are your future goals?",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 5,
      name: "listening",
      type: "number",
      placeholder: "Listening",
      errorMessage: "It should be a valid score!",
      label: "English Scores - Listening",
      pattern: "^[0-9]{3,16}$",
      required: true,
    },
    {
      id: 6,
      name: "reading",
      type: "number",
      placeholder: "Reading",
      errorMessage: "It should be a valid score!",
      label: "English Scores - Reading",
      pattern: "^[0-9]{3,16}$",
      required: true,
    },
    {
      id: 7,
      name: "speaking",
      type: "number",
      placeholder: "Speaking",
      errorMessage: "It should be a valid score!",
      label: "English Scores - Speaking",
      pattern: "^[0-9]{3,16}$",
      required: true,
    },
    {
      id: 8,
      name: "writing",
      type: "number",
      placeholder: "writing",
      errorMessage: "It should be a valid score!",
      label: "English Scores - Writing",
      pattern: "^[0-9]{3,16}$",
      required: true,
    },
  ];

  const onChange = (e) => {
    dispatch(updateFocus(false));
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(AdmissionDetails).length > 0) setValues(AdmissionDetails);
  }, []);

  useEffect(() => {
    dispatch(updateAdmissionDetails(values));
  }, [
    values.instituteAdmitted,
    values.programStudy,
    values.applyingCountry,
    values.futureGoals,
    values.listening,
    values.reading,
    values.speaking,
    values.writing,
  ]);

  useEffect(() => {
    if (checkFocus) {
      let errors = Validate(inputs, values);
      if (navigation === "next") {
        setErrorMessage(true);
        if (Object.keys(errors).length === 0) {
          setErrorMessage(false);
          dispatch(changeSection(sectionIndex + 1));
        }
      } else {
        setErrorMessage(false);
        dispatch(changeSection(sectionIndex - 1));
      }
      dispatch(updateFocus(false));
    }
  }, [checkFocus]);

  return (
    <div className={styles.DetailsCont}>
      {errorMessage && (
        <div className={styles.errorMessage}>Enter the details correctly</div>
      )}
      {inputs.map((input) => {
        return (
          <CommonInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

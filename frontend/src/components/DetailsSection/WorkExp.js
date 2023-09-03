import React, { useState, useEffect } from "react";
import { CommonInput } from "../../utils/CommonInput/CommonInput.js";
import styles from "./styles.module.scss";
import {
  updateWorkExp,
  updateFocus,
  changeSection,
} from "../../redux/SectionSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Validate } from "../../utils/Validate.js";

export const WorkExp = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    workExp: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const { WorkExpDetails, navigation, sectionIndex, checkFocus } = useSelector(
    (state) => state.section
  );

  const inputs = [
    {
      id: 1,
      name: "workExp",
      type: "text",
      placeholder: "Work experience",
      errorMessage: "Work experience should contain atleast 1 digit",
      label:
        "Do you have any relevant work experience? Write None if no work experience. Provide the following details if yes: 1.Job Title, 2.Company Name, 3.Job duties",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
  ];

  const onChange = (e) => {
    dispatch(updateFocus(false));
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(WorkExpDetails).length > 0) setValues(WorkExpDetails);
  }, []);

  useEffect(() => {
    dispatch(updateWorkExp(values));
  }, [values.workExp]);

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

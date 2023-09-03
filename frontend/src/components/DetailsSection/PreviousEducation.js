import React, { useState, useEffect } from "react";
import { CommonInput } from "../../utils/CommonInput/CommonInput.js";
import styles from "./styles.module.scss";
import {
  updatePreviousEducation,
  updateFocus,
  changeSection,
} from "../../redux/SectionSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Validate } from "../../utils/Validate.js";

export const PreviousEducation = () => {
  const [values, setValues] = useState({
    previousEducation: "",
    institute: "",
    study: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const { checkFocus, navigation, sectionIndex, PreviousEducationDetails } =
    useSelector((state) => state.section);

  const inputs = [
    {
      id: 1,
      name: "previousEducation",
      type: "text",
      placeholder: "Previous Education",
      errorMessage: "It should be a valid institute name!",
      label: "Highest Level of Education",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "institute",
      type: "text",
      placeholder: "Institute",
      errorMessage: "It should be a valid institute name!",
      label: "Institute where you completed your highest level of education",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "study",
      type: "text",
      placeholder: "Branch",
      errorMessage: "It should be a valid branch",
      label: "What did you study",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
  ];

  const onChange = (e) => {
    dispatch(updateFocus(false));
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(PreviousEducationDetails).length > 0)
      setValues(PreviousEducationDetails);
  }, []);

  useEffect(() => {
    dispatch(updatePreviousEducation(values));
  }, [values.previousEducation, values.institute, values.study]);

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

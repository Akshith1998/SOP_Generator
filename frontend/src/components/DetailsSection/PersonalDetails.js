import React, { useEffect, useState } from "react";
import { CommonInput } from "../../utils/CommonInput/CommonInput.js";
import styles from "./styles.module.scss";
import {
  updatePersonalDetails,
  updateFocus,
  changeSection,
} from "../../redux/SectionSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Validate } from "../../utils/Validate.js";

export const PersonalDetails = () => {
  const dispatch = useDispatch();
  const { checkFocus } = useSelector((state) => state.section);
  const [values, setValues] = useState({
    email: "",
    fullname: "",
    age: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const { personalDetails } = useSelector((state) => state.section);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "fullname",
      type: "text",
      placeholder: "Full Name",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Full Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "age",
      type: "number",
      placeholder: "Age",
      errorMessage: "Age should have atleast 1 digit!",
      label: "Age",
      pattern: "^[0-9]{1,3}$",
      required: true,
    },
  ];

  const onChange = (e) => {
    dispatch(updateFocus(false));
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(personalDetails).length > 0) setValues(personalDetails);
  }, []);

  useEffect(() => {
    dispatch(updatePersonalDetails(values));
  }, [values.email, values.age, values.fullname]);

  useEffect(() => {
    if (checkFocus) {
      let errors = Validate(inputs, values);
      setErrorMessage(true);
      if (Object.keys(errors).length === 0) {
        setErrorMessage(false);
        dispatch(changeSection(2));
        dispatch(updateFocus(false));
      }
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

import React, { useState } from "react";
import styles from "./CommonInput.module.scss";
import { useDispatch, useSelector } from "react-redux";

export const CommonInput = (props) => {
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span id="errorSpan">
        {errorMessage}
      </span>
    </div>
  );
};

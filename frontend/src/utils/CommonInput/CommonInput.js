import React, { useEffect, useRef, useState } from "react";
import styles from "./CommonInput.module.scss";
import { useDispatch, useSelector } from "react-redux";

export const CommonInput = (props) => {
  const dispatch = useDispatch();
  const errorSpanRef = useRef();
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const { checkFocus } = useSelector((state) => state.section);
  const handleFocus = (e) => {
    setFocused(true);
  };

  // useEffect(() => {
  //   if (checkFocus) setFocused(true);
  // }, [checkFocus]);

  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span id="errorSpan" ref={errorSpanRef}>
        {errorMessage}
      </span>
    </div>
  );
};

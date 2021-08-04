import React from "react";
import { InputField } from "../input-field";
import classes from "classnames";
import styles from "./styles.module.scss";

type InputWithUpperLabelProps = {
  inputId: string;
  label: string;
  value: string | number;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
};

function InputWithUpperLabel({
  inputId,
  className = "",
  value,
  label,
  onChange,
  placeholder,
}: InputWithUpperLabelProps) {
  return (
    <div className={classes(styles.InputWithUpperLabelWrapper, className)}>
      <label className={styles.InputLabel} htmlFor={inputId}>
        {label}
      </label>
      <InputField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={inputId}
      />
    </div>
  );
}

export default InputWithUpperLabel;

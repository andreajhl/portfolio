import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";

type InputWithFloatLabelProps = {
  onChangeValue: (arg: string) => void;
  placeholder: string;
  value: string;
  inputType?: string;
  className?: string;
};

const InputWithFloatLabel = ({
  onChangeValue,
  placeholder,
  inputType = "text",
  className = "",
  value
}: InputWithFloatLabelProps) => {
  return (
    <div className={classes(styles.InputWithFloatLabelContainer, className)}>
      <input
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        type={inputType}
        placeholder={placeholder}
      />
      <label>{placeholder}</label>
    </div>
  );
};

export default InputWithFloatLabel;

import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import Maybe from "../../helpers/maybe";
import WarningMessage from "../../warning-message";

type InputWithFloatLabelProps = {
  onChangeValue: (arg: string) => void;
  placeholder: string;
  value: string;
  inputType?: string;
  errorMessage: null | string;
  className?: string;
};

const InputWithFloatLabel = ({
  onChangeValue,
  placeholder,
  inputType = "text",
  className = "",
  value,
  errorMessage
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
      <Maybe it={typeof errorMessage === "string" && errorMessage.length > 0}>
        <div className={styles.WarningMessage}>
          <WarningMessage message={errorMessage} />
        </div>
      </Maybe>
    </div>
  );
};

export default InputWithFloatLabel;

import React, { useEffect, useState } from "react";
import { CheckIcon } from "../../icons";
import styles from "./styles.module.scss";

type CheckboxProps = {
  label: string;
  onChangeChecked: (arg: boolean) => void;
  checked?: boolean;
  controlled?: boolean;
  style?: React.CSSProperties;
};

function Checkbox({
  label,
  onChangeChecked,
  checked = false,
  style,
  controlled = false
}: CheckboxProps) {
  const [unControlledValue, setUnControlledValue] = useState(checked);
  const handleCheck = (value: boolean) => {
    if (!controlled) {
      setUnControlledValue(value);
    }
    onChangeChecked(value);
  };

  const isInputChecked = controlled ? checked : unControlledValue;
  return (
    <label className={styles.LabelContainer} style={style}>
      <div className={styles.CheckboxContainer}>
        <input
          className={styles.HiddenCheckbox}
          checked={isInputChecked}
          onChange={(event) => {
            handleCheck(event.target.checked);
          }}
          type="checkbox"
        ></input>
        <div
          className={`${styles.StyledCheckbox} ${
            isInputChecked ? styles.StyledCheckbox__Checked : ""
          }`}
        >
          <CheckIcon></CheckIcon>
        </div>
      </div>
      <span className={styles.Label}>{label}</span>
    </label>
  );
}

export default Checkbox;

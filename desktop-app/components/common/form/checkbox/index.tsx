import React, { useEffect, useState } from "react";
import { CheckIcon } from "../../icons";
import styles from "./styles.module.scss";

type CheckboxProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  style?: React.CSSProperties;
  name: string;
};

function Checkbox({
  label,
  onChange,
  checked = false,
  style,
  name
}: CheckboxProps) {
  return (
    <label className={styles.LabelContainer} style={style}>
      <div className={styles.CheckboxContainer}>
        <input
          className={styles.HiddenCheckbox}
          checked={checked}
          onChange={onChange}
          name={name}
          type="checkbox"
        ></input>
        <div
          className={`${styles.StyledCheckbox} ${
            checked ? styles.StyledCheckbox__Checked : ""
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

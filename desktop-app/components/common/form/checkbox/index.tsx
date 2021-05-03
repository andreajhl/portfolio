import React, { useEffect, useState } from "react";
import Maybe from "../../helpers/maybe";
import { CheckIcon } from "../../icons";
import styles from "./styles.module.scss";
import classes from "classnames";

type CheckboxProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  style?: React.CSSProperties;
  name: string;
  value: any;
  alignLabel?: "left" | "right";
  checkboxLayout?: "box" | "circle";
  className?: string;
};

function Checkbox({
  label,
  onChange,
  checked = false,
  style,
  name,
  value,
  className = "",
  checkboxLayout = "box",
  alignLabel = "right",
}: CheckboxProps) {
  return (
    <label className={classes(styles.LabelContainer, className)} style={style}>
      <Maybe it={alignLabel === "left"}>
        <span className={styles.Label}>{label}</span>
      </Maybe>
      <div className={styles.CheckboxContainer}>
        <input
          className={styles.HiddenCheckbox}
          checked={checked}
          onChange={onChange}
          value={value}
          name={name}
          type="checkbox"
        ></input>
        <div
          className={`${classes(
            styles.StyledCheckbox,
            checkboxLayout === "box" ? "" : styles.StyledCheckboxCircle
          )} ${checked ? styles.StyledCheckbox__Checked : ""}`}
        >
          <CheckIcon></CheckIcon>
        </div>
      </div>
      <Maybe it={alignLabel === "right"}>
        <span className={styles.Label}>{label}</span>
      </Maybe>
    </label>
  );
}

export default Checkbox;

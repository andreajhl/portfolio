import React, { useState } from "react";
import Checkbox from "../form/checkbox";
import Maybe from "../helpers/maybe";
import styles from "./styles.module.scss";

type option = { label: string; value: any; checked?: boolean };

type CheckBoxListProps = {
  options: option[];
  title: string;
  controlled?: boolean;
  onCheckOption: (checked: boolean, option: option) => void;
};

function CheckBoxList({
  options,
  onCheckOption,
  title,
  controlled = false
}: CheckBoxListProps) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      <p className={styles.Title}>{title}</p>
      {options.slice(0, 5).map((option) => (
        <>
          <Checkbox
            style={{
              margin: "0 0 11px 0"
            }}
            controlled={controlled}
            label={option.label}
            checked={option.checked}
            onChangeChecked={(value) => onCheckOption(value, option)}
          ></Checkbox>
        </>
      ))}
      {showMore ? (
        <div>
          {options.slice(5).map((option) => (
            <Checkbox
              style={{
                margin: "0 0 11px 0"
              }}
              controlled={controlled}
              label={option.label}
              checked={option.checked}
              onChangeChecked={(value) => onCheckOption(value, option)}
            ></Checkbox>
          ))}
        </div>
      ) : null}
      <Maybe it={options.length > 5}>
        <div>
          <span
            onClick={() => setShowMore((prevState) => !prevState)}
            className={styles.CTAShowMore}
          >
            {showMore ? "Ver menos" : "Ver mas"}
          </span>
        </div>
      </Maybe>
    </div>
  );
}

export default CheckBoxList;

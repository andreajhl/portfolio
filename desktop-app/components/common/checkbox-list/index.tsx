import React, { useEffect, useState } from "react";
import Checkbox from "../form/checkbox";
import Maybe from "../helpers/maybe";
import styles from "./styles.module.scss";

type option = { label: string; name: string; checked: boolean };

type CheckBoxListProps = {
  options: option[];
  title: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

function CheckBoxList({ options, handleChange, title }: CheckBoxListProps) {
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
            name={option.name}
            label={option.label}
            checked={option.checked}
            onChange={(event) => handleChange(event)}
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
              label={option.label}
              name={option.name}
              checked={option.checked}
              onChange={(event) => handleChange(event)}
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

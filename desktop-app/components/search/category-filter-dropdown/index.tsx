import { Dropdown } from "desktop-app/components/common/button/dropdown";
import styles from "./styles.module.scss";
import classes from "classnames";
import { useEffect, useState } from "react";
import Checkbox from "desktop-app/components/common/form/checkbox";

type OptionType = {
  label: string;
  value: string;
  checked?: boolean;
};

type CategoryFilterDropdownProps = {
  title: string;
  className?: string;
  options: OptionType[];
  onChange: (param: string) => void;
};
function CategoryFilterDropdown({
  title,
  className,
  options,
  onChange,
}: CategoryFilterDropdownProps) {
  const [optionsState, setOptionsState] = useState(
    options.map((option) => ({ ...option, checked: option.checked }))
  );
  const handleChange = (event) => {
    const value = event.target.value;
    setOptionsState((prevState) => {
      let newState = prevState.map((option) => {
        if (option.value === value) {
          option.checked = !option.checked;
          return option;
        } else {
          return option;
        }
      });
      return newState;
    });
    onChange(value);
  };
  useEffect(() => {
    let filters = optionsState.filter((option) => option.checked);
    let values = filters.map((filter) => filter.value).join(",");
    onChange(values);
  }, [optionsState]);

  return (
    <Dropdown
      menuPosition="bottom right"
      buttonChildren={
        <>
          <span className={styles.OrderByDropdownTitle}>{title}</span>
          <i className={`fa fa-chevron-down ${styles.OrderByDropdownIcon}`} />
        </>
      }
      menuClassName={styles.OrderByDropdown}
      buttonClassName={classes(styles.OrderByDropdownButton, className)}
      className={styles.DropdownWrapper}
    >
      {optionsState.map((option) => (
        <Checkbox
          style={{
            margin: "0 0 11px 0",
          }}
          label={option.label}
          value={option.value}
          checked={option.checked}
          onChange={(event) => handleChange(event)}
        ></Checkbox>
      ))}
    </Dropdown>
  );
}

export default CategoryFilterDropdown;

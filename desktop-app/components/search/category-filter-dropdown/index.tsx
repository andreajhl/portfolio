import { Dropdown } from "desktop-app/components/common/button/dropdown";
import styles from "./styles.module.scss";
import classes from "classnames";
import { ChangeEvent, useEffect, useState } from "react";
import Checkbox from "desktop-app/components/common/form/checkbox";

type OptionType = {
  label: string;
  value: string;
  unique?: boolean;
};

type CategoryFilterDropdownProps = {
  title: string;
  className?: string;
  options: OptionType[];
  onChange: (param: string) => void;
  checkedOptions: string[];
};
function CategoryFilterDropdown({
  title,
  className,
  options,
  onChange,
  checkedOptions,
}: CategoryFilterDropdownProps) {
  const handleChange = (indexElement: number) => {
    const newOption = options[indexElement];
    if (newOption.unique) {
      onChange(newOption.value);
    } else {
      if (checkedOptions.includes(newOption.value)) {
        const newOptions = checkedOptions
          .filter((element) => element != newOption.value)
          .join(",");
        onChange(newOptions);
      } else {
        onChange([...checkedOptions, newOption.value].join(","));
      }
    }
  };

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
      {options.map((option, index) => (
        <Checkbox
          style={{
            margin: "0 0 11px 0",
          }}
          label={option.label}
          value={option.value}
          checked={checkedOptions.includes(option.value)}
          onChange={(_) => handleChange(index)}
        ></Checkbox>
      ))}
    </Dropdown>
  );
}

export default CategoryFilterDropdown;

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
    const optionSelected = options[indexElement];
    const valuesOfOptionSelected = optionSelected.value.split(",");
    if (
      valuesOfOptionSelected.some((value) => checkedOptions.includes(value))
    ) {
      let newOptions = checkedOptions;
      newOptions = newOptions.filter((option) => {
        console.log(option, "option");
        return valuesOfOptionSelected.every((value) => value != option);
      });
      onChange(newOptions.join(","));
    } else {
      onChange([...checkedOptions, valuesOfOptionSelected].join(","));
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
          checked={option.value
            .split(",")
            .some((el) => checkedOptions.includes(el))}
          onChange={(_) => handleChange(index)}
        ></Checkbox>
      ))}
    </Dropdown>
  );
}

export default CategoryFilterDropdown;

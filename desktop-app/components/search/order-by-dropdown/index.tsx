import { ReactNode } from "react";
import { Dropdown } from "../../common/button/dropdown";
import classes from "classnames";
import styles from "./styles.module.scss";

type OptionType = {
  label: ReactNode;
  value: any;
};

type OrderByDropdownProps = {
  title?: ReactNode;
  className?: string;
  options: OptionType[];
  selectedOption?: OptionType;
  onChange?: (value: any) => void;
};

function OrderByDropdown({
  title = "Ordenar por",
  className = "",
  options,
  selectedOption,
  onChange = function () {},
}: OrderByDropdownProps) {
  return (
    <Dropdown
      menuPosition="bottom right"
      buttonChildren={
        <>
          <span className={styles.OrderByDropdownTitle}>{title}</span>
          <span className={styles.OrderByDropdownSelectedLabel}>
            {selectedOption.label}
          </span>
          <i className={`fa fa-chevron-down ${styles.OrderByDropdownIcon}`} />
        </>
      }
      menuClassName={styles.OrderByDropdown}
      buttonClassName={classes(styles.OrderByDropdownButton, className)}
    >
      {(_isOpen, toggleIsOpen) =>
        options.map((option) => (
          <div
            className={`${styles.OrderByDropdownItem} ${
              selectedOption === option ? styles.OrderByDropdownItemActive : ""
            }`}
            onClick={() => {
              toggleIsOpen();
              onChange(option);
            }}
          >
            {option.label}
          </div>
        ))
      }
    </Dropdown>
  );
}

export { OrderByDropdown };

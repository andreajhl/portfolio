import { OrderByIcon } from "desktop-app/components/common/icons";
import { ReactNode } from "react";
import { Dropdown } from "../../common/button/dropdown";
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
  title = "Ordenar por:",
  className = "",
  options,
  selectedOption,
  onChange = function () {}
}: OrderByDropdownProps) {
  return (
    <Dropdown
      className={className}
      buttonChildren={<OrderByIcon />}
      menuClassName={styles.OrderByDropdown}
      buttonClassName={styles.OrderByDropdownButton}
    >
      {(_isOpen, toggleIsOpen) => [
        <div className={styles.OrderByDropdownTitle}>{title}</div>,
        options.map(({ label, value }) => (
          <div
            className={`${styles.OrderByDropdownItem} ${
              selectedOption === value ? styles.OrderByDropdownItemActive : ""
            }`}
            onClick={() => {
              toggleIsOpen();
              onChange(value);
            }}
          >
            {label}
          </div>
        ))
      ]}
    </Dropdown>
  );
}

export { OrderByDropdown };

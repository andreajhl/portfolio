import classes from "classnames";
import React, { ReactNode, useState } from "react";
import styles from "./styles.module.scss";

const addDropdownItemClass = (
  child: React.DetailedReactHTMLElement<{ className?: string }, HTMLElement>
) =>
  React.cloneElement(child, {
    className: classes("dropdown-item", child?.props?.className),
  });

type DropdownProps = {
  id?: string;
  buttonChildren: ReactNode;
  children: ReactNode;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  showClassName?: string;
};

function Dropdown({
  id = "dropdown-icon-button",
  buttonChildren,
  children,
  className = "",
  buttonClassName = "",
  menuClassName = "",
  showClassName = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={classes("dropdown", { show: isOpen }, className)}>
      <button
        className={classes(styles.DropdownButton, buttonClassName)}
        onClick={toggleIsOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
        id={id}
        type="button"
      >
        {buttonChildren}
      </button>
      <div
        aria-labelledby={id}
        className={classes(
          "dropdown-menu",
          { [showClassName]: isOpen, show: isOpen },
          menuClassName
        )}
      >
        {React.Children.map(children, addDropdownItemClass)}
      </div>
    </div>
  );
}

export { Dropdown };

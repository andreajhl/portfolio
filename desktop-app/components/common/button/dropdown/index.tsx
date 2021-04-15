import classes from "classnames";
import React, { useState } from "react";
import styles from "./styles.module.scss";

const addDropdownItemClass = (
  child: React.DetailedReactHTMLElement<{ className?: string }, HTMLElement>
) =>
  React.cloneElement(child, {
    className: classes("dropdown-item", child?.props?.className)
  });

function Dropdown({
  id = "dropdown-icon-button",
  buttonChildren,
  children,
  className = "",
  buttonClassName = "",
  menuClassName = "",
  showClassName = ""
}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  const childNodes =
    typeof children === "function" ? children(isOpen, toggleIsOpen) : children;

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
        {React.Children.map(childNodes, addDropdownItemClass)}
      </div>
    </div>
  );
}

export { Dropdown };

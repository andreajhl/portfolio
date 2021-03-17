import classes from "classnames";
import React, { useState } from "react";
import styles from "./styles.module.scss";

function Dropdown({
  id = "dropdown-icon-button",
  buttonChildren,
  children,
  className = "",
  menuClassName = ""
}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={classes("dropdown", { show: isOpen }, className)}>
      <button
        className={styles.DropdownButton}
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
        className={classes("dropdown-menu", { show: isOpen }, menuClassName)}
      >
        {React.Children.map(children, addDropdownItemClass)}
      </div>
    </div>
  );
}

export { Dropdown };

const addDropdownItemClass = (
  child: React.DetailedReactHTMLElement<{ className?: string }, HTMLElement>
) =>
  React.cloneElement(child, {
    className: classes("dropdown-item", child?.props?.className)
  });

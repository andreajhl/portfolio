import classes from "classnames";
import {
  DetailedReactHTMLElement,
  cloneElement,
  ReactNode,
  Children as ReactChildren,
} from "react";
import { PopupProps } from "reactjs-popup/dist/types";
import { AnimatedPopup } from "../../animated-popup";
import styles from "./styles.module.scss";

const addDropdownItemClass = (
  child: DetailedReactHTMLElement<{ className?: string }, HTMLElement>
) =>
  cloneElement(child, {
    className: classes("dropdown-item", child?.props?.className),
  });

type DropdownProps = {
  id?: string;
  buttonChildren: ReactNode;
  children?:
    | ReactNode
    | ((isOpen: boolean, closePopup: () => void) => ReactNode);
  showArrow?: boolean;
  menuPosition?: PopupProps["position"];
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  showClassName?: string;
};

function Dropdown({
  id = "dropdown-icon-button",
  buttonChildren,
  children,
  showArrow = false,
  menuPosition,
  buttonClassName = "",
  menuClassName = "",
}: DropdownProps) {
  const trigger = (isOpen: boolean): JSX.Element => (
    <button
      className={classes(styles.DropdownButton, buttonClassName)}
      aria-haspopup="true"
      aria-expanded={isOpen}
      id={id}
      type="button"
    >
      {buttonChildren}
    </button>
  );

  const dropdownMenu = (closePopup: () => void, isOpen: boolean) => (
    <div
      aria-labelledby={id}
      className={classes(styles.DropdownMenu, menuClassName)}
    >
      {ReactChildren.map(
        typeof children === "function"
          ? children(isOpen, closePopup)
          : children,
        addDropdownItemClass
      )}
    </div>
  );

  return (
    <AnimatedPopup position={menuPosition} trigger={trigger} arrow={showArrow}>
      {dropdownMenu}
    </AnimatedPopup>
  );
}

export { Dropdown };

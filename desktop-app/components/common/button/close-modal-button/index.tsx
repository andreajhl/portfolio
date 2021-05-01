import { ButtonHTMLAttributes } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type CloseModalButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function CloseModalButton({
  className = "",
  children,
  ...props
}: CloseModalButtonProps) {
  return (
    <button
      type="button"
      className={classes("btn", styles.CloseModalButton, className)}
      {...props}
    >
      <i className="fa fa-times" />
    </button>
  );
}

export { CloseModalButton };

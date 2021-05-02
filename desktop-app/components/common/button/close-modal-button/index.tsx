import { ButtonHTMLAttributes } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type CloseModalButtonProps = {
  variant: "dark" | "light";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function CloseModalButton({
  className = "",
  children,
  variant = "dark",
  ...props
}: CloseModalButtonProps) {
  return (
    <button
      type="button"
      className={classes(
        "btn",
        styles.CloseModalButton,
        styles[variant],
        className
      )}
      {...props}
    >
      <i className="fa fa-times" />
    </button>
  );
}

export { CloseModalButton };

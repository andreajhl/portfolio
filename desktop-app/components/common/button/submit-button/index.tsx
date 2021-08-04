import styles from "./styles.module.scss";
import { ComponentPropsWithRef } from "react";
import classes from "classnames";

type SubmitButtonProps = {} & ComponentPropsWithRef<"button">;

function SubmitButton({
  children = "Guardar",
  type = "submit",
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      className={classes("btn btn-primary", styles.SubmitButton, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default SubmitButton;

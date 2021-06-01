import { ReactNode } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type GoogleButtonProps = {
  children?: ReactNode;
  className?: string;
};

function GoogleButton({ children, className }: GoogleButtonProps) {
  return (
    <button
      type="button"
      className={classes("btn", styles.GoogleButton, className)}
    >
      <img src="/assets/img/google-logo.svg" alt="Logo de Google" />
      {children}
    </button>
  );
}

export { GoogleButton };

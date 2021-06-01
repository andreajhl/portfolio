import { ReactNode } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type FacebookButtonProps = {
  children?: ReactNode;
  className?: string;
};

function FacebookButton({ children, className }: FacebookButtonProps) {
  return (
    <button
      type="button"
      className={classes("btn", styles.FacebookButton, className)}
    >
      <img src="/assets/img/facebook-f.svg" alt="Logo de Facebook" />
      {children}
    </button>
  );
}

export { FacebookButton };

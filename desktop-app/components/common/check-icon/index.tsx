import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";

type CheckIconProps = {
  className?: string;
};

function CheckIcon({ className = "" }: CheckIconProps) {
  return <i className={classes("fa fa-check", styles.Check, className)} />;
}

export { CheckIcon };

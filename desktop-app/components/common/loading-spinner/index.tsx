import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";

function LoadingSpinner() {
  return <i className={classes("fa fa-circle-notch", styles.Spinner)} />;
}

export { LoadingSpinner };

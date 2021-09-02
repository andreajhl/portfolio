import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";

interface LoadingSpinnerProps {
  className?: string;
  cssStyle?: React.CSSProperties;
}
function LoadingSpinner({ className, cssStyle }: LoadingSpinnerProps) {
  return (
    <i
      style={cssStyle}
      className={classes(
        "fa fa-spin fa-circle-notch",
        styles.Spinner,
        className
      )}
    />
  );
}

export { LoadingSpinner };
